import puppeteer, { Browser, Page } from 'puppeteer';
import randomUseragent from 'random-useragent';
import mongoose from 'mongoose';
import referers from './referers.json';
import User, { IUser } from './models/User';
import { CreateUserDto } from './dtos/CreateUser.dto';

let browser: Browser | null = null;
let page: Page | null = null;

export async function loginToKundelik(username: string, password: string, retries: number = 3): Promise<IUser | null> {
  try {
    const randomReferer = referers[Math.floor(Math.random() * referers.length)];
    const userAgent = randomUseragent.getRandom();
    
    console.log('Using Referer:', randomReferer);
    console.log('Using User Agent:', userAgent);

    browser = await puppeteer.launch({ headless: false, devtools: true });
    page = await browser.newPage();
    page.setExtraHTTPHeaders({ referer: randomReferer, 'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7' });
    page.setUserAgent(userAgent);

    await page.goto('https://login.kundelik.kz/login', { timeout: 60000 });

    await page.waitForSelector('input[name="login"]', { timeout: 10000 });
    await page.type('input[name="login"]', username);

    await page.waitForSelector('input[name="password"]', { timeout: 10000 });
    await page.type('input[name="password"]', password);

    await page.click('input[type="submit"]');

    await page.waitForNavigation({ timeout: 60000 });

    console.log('Login successful');

    await changeLanguageToRussian(page);
    
    const userInfo = await getInfoAboutUser(page);
    const classes = await getMyClasses(page);
    
    // if (userInfo.userType === 'Teacher') {
    //   userInfo.classes = classes;
    // }

    const user = new User(userInfo);
    await user.save();

    return user;
  } catch (error) {
    console.error('Error during login:', error);
    if (retries > 0) {
      console.log(`Retrying... (${retries} attempts left)`);
      await page?.close();
      await browser?.close();
      return loginToKundelik(username, password, retries - 1);
    } else {
      console.error('All retry attempts failed.');
      return null;
    }
  } finally {
    await browser?.close();
  }
}

async function changeLanguageToRussian(page: Page) {
  await page.click('a[title="Русский"]');
  await page.waitForNavigation({ timeout: 60000 });
}

async function getInfoAboutUser(page: Page): Promise<CreateUserDto> {
  // Логика получения информации о пользователе из Kundelik.kz
  // Заполните данные, такие как name, surname, thirdname и userType
  return {
    kundelikLogin: '',
    kundelikPassword: '',
    name: '',
    surname: '',
    thirdname: '',
    userType: 'Teacher' // или 'Student'
  };
}

async function getMyClasses(page: Page) {
  // Логика получения классов для учителя из Kundelik.kz
  return [];
}
