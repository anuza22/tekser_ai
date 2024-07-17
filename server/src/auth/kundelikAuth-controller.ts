import { Request, Response } from 'express';
import User from './models/User'; // Adjust the path according to your project structure
import { KunAPI } from './kundelik-api'; // Adjust the path according to your project structure

export async function login(req: Request, res: Response) {
  const { kundelikLogin, kundelikPassword } = req.body;
  
  if (!kundelikLogin || !kundelikPassword) {
    return res.status(400).send('Login and password are required');
  }

  try {
    const kundelik = new KunAPI(kundelikLogin, kundelikPassword);

    // Wait for the initialization to complete
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Fetch user info as a test of successful login
    const userInfo = await kundelik.getInfo();

    if (userInfo) {
      // Save or update user info in your database
      const existingUser = await User.findOne({ kundelikLogin });
      if (existingUser) {
        existingUser.id = userInfo.id;
        existingUser.id_str = userInfo.id_str;
        existingUser.personId = userInfo.personId;
        existingUser.personId_str = userInfo.personId_str;
        existingUser.kundelikToken = kundelik.token!;
        existingUser.shortName = userInfo.shortName;
        existingUser.locale = userInfo.locale;
        existingUser.timezone = userInfo.timezone;
        existingUser.sex = userInfo.sex;
        existingUser.birthday = new Date(userInfo.birthday);
        existingUser.roles = userInfo.roles;
        existingUser.phone = userInfo.phone || '';
        await existingUser.save();
      } else {
        const newUser = new User({
          id: userInfo.id,
          id_str: userInfo.id_str,
          personId: userInfo.personId,
          personId_str: userInfo.personId_str,
          kundelikLogin,
          kundelikPassword, // Store passwords securely in a real application
          kundelikToken: kundelik.token,
          shortName: userInfo.shortName,
          locale: userInfo.locale,
          timezone: userInfo.timezone,
          sex: userInfo.sex,
          birthday: new Date(userInfo.birthday),
          roles: userInfo.roles,
          phone: userInfo.phone || '',
        });
        await newUser.save();
      }

      return res.status(200).json(userInfo);
    } else {
      return res.status(500).send('Failed to retrieve user info from Kundelik.kz');
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).send('Failed to log in to Kundelik.kz');
  }
}

export async function getUser(req: Request, res: Response) {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).send('Error fetching user');
  }
}
