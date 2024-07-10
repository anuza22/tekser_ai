import puppeteer, { Browser, Page } from 'puppeteer';
import randomUseragent from 'random-useragent';
import referers from './referers.json';

let browser: Browser | null = null;
let page: Page | null = null;

export async function loginToKundelik(username: string, password: string, retries: number = 3): Promise<void> {
  try {
    const randomReferer = referers[Math.floor(Math.random() * referers.length)];
    const userAgent = randomUseragent.getRandom();
    
    console.log('Using Referer:', randomReferer);
    console.log('Using User Agent:', userAgent);

    browser = await puppeteer.launch({ headless: false, devtools: true });
    page = await browser.newPage();
    page.setExtraHTTPHeaders({ referer: randomReferer });
    page.setUserAgent(userAgent);

    await page.goto('https://login.kundelik.kz/login', { timeout: 60000 });

    await page.waitForSelector('input[name="login"]', { timeout: 10000 });
    await page.type('input[name="login"]', username);

    await page.waitForSelector('input[name="password"]', { timeout: 10000 });
    await page.type('input[name="password"]', password);

    await page.click('input[type="submit"]');

    await page.waitForNavigation({ timeout: 60000 });

    console.log('Login successful');
    
    const classes = await getMyClasses();
    console.log('Classes:', classes);
    
    if (classes.length > 0) {
      const students = await getStudentsFromClass(classes[0].classLink);
      console.log('Students:', students);
    }
  } catch (error) {
    console.error('Error during login:', error);
    if (retries > 0) {
      console.log(`Retrying... (${retries} attempts left)`);
      await page?.close();
      await browser?.close();
      return loginToKundelik(username, password, retries - 1);
    } else {
      console.error('All retry attempts failed.');
    }
  } finally {
    await browser?.close();
  }
}

export async function getMyClasses(): Promise<{ className: string, classLink: string }[]> {
  if (!page || !browser) {
    throw new Error('You must log in first');
  }

  try {
    await page.goto('https://schools.kundelik.kz/v2/myclasses', { waitUntil: 'networkidle2' });

    const classes = await page.evaluate(() => {
      const classElements = document.querySelectorAll('a[title="На страницу класса"]');
      const classList: { className: string, classLink: string }[] = [];
      classElements.forEach(element => {
        const className = element.textContent?.trim() || '';
        const classLink = (element as HTMLAnchorElement).href;
        classList.push({ className, classLink });
      });
      return classList;
    });

    return classes;
  } catch (error) {
    console.error('Error during scraping classes:', error);
    return [];
  }
}

export async function getStudentsFromClass(classUrl: string): Promise<{ studentName: string, studentPage: string }[]> {
  if (!page || !browser) {
    throw new Error('You must log in first');
  }

  try {
    await page.goto(classUrl, { waitUntil: 'networkidle2' });
    await page.click('#TabMembers'); // Нажимаем на вкладку "Люди"
    await page.waitForSelector('tbody .tdName a.u', { timeout: 60000 }); // Ждем загрузки таблицы со студентами

    const students = await page.evaluate(() => {
      const studentElements = document.querySelectorAll('tbody .tdName a.u');
      const studentList: { studentName: string, studentPage: string }[] = [];
      studentElements.forEach(element => {
        const studentName = element.textContent?.trim() || '';
        const studentPage = (element as HTMLAnchorElement).href;
        studentList.push({ studentName, studentPage });
      });
      return studentList;
    });

    return students;
  } catch (error) {
    console.error('Error during scraping students:', error);
    return [];
  }
}