import { Request, Response } from 'express';
import User from './models/User'; // Adjust the path according to your project structure
import { KunAPI } from './kundelik-api'; // Adjust the path according to your project structure

export async function login(req: Request, res: Response) {
  const { kundelikLogin, kundelikPassword } = req.body;

  console.log("Data", kundelikLogin, kundelikPassword);

  if (!kundelikLogin || !kundelikPassword) {
    return res.status(400).send('Login and password are required');
  }

  try {
    // Check if the user already exists in the database
    let user = await User.findOne({ kundelikLogin });

    if (user) {
      // User already exists, update the token and other information
      kundelik = new KunAPI(kundelikLogin, kundelikPassword);
      await kundelik.initialize(kundelikLogin, kundelikPassword);
      const userInfo = await kundelik.getInfo();
      const userContext = await kundelik.getContext();

      user.kundelikToken = kundelik.token!;
      user.schoolName = userContext.schoolName;
      user.className = userContext.className;
      user.subjectName = userContext.subjectName;
      user.userRole = userContext.userRole;

      await user.save();
      return res.status(200).json({ user, token: kundelik.token });
    } else {
      // User does not exist, proceed with API calls and save new user
      kundelik = new KunAPI(kundelikLogin, kundelikPassword);
      await kundelik.initialize(kundelikLogin, kundelikPassword);
      const userInfo = await kundelik.getInfo();
      const userContext = await kundelik.getContext();

      if (userInfo && userContext) {
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
          schoolName: userContext.schoolName,
          className: userContext.className,
          subjectName: userContext.subjectName,
          userRole: userContext.userRole,
        });

        await newUser.save();
        return res.status(200).json({ user: newUser, token: kundelik.token });
      } else {
        return res.status(500).send('Failed to retrieve user info from Kundelik.kz');
      }
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).send('Failed to log in to Kundelik.kz');
  }
}
let kundelik: KunAPI;

export async function getUserInfo(req: Request, res: Response) {
  try {
    const data = await kundelik.getInfo();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching user info:', error);
    return res.status(500).send('Error fetching user info');
  }
}

export async function getUserSchools(req: Request, res: Response) {
  try {
    const data = await kundelik.getSchools();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching user schools:', error);
    return res.status(500).send('Error fetching user schools');
  }
}

export async function getUserEduGroups(req: Request, res: Response) {
  try {
    const data = await kundelik.getEduGroups();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching user edu groups:', error);
    return res.status(500).send('Error fetching user edu groups');
  }
}

export async function getUserContext(req: Request, res: Response) {
  try {
    const data = await kundelik.getContext();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching user context:', error);
    return res.status(500).send('Error fetching user context');
  }
}

export async function getPersonInfo(req: Request, res: Response) {
  const personId = Number(req.params.personId);
  try {
    const data = await kundelik.getPersonInfo(personId);
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching person info:', error);
    return res.status(500).send('Error fetching person info');
  }
}

export async function getPersonGroups(req: Request, res: Response) {
  const personId = Number(req.params.personId);
  try {
    const data = await kundelik.getPersonGroups(personId);
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching person groups:', error);
    return res.status(500).send('Error fetching person groups');
  }
}

export async function getGroupInfo(req: Request, res: Response) {
  const groupId = Number(req.params.groupId);
  try {
    const data = await kundelik.getGroupInfo(groupId);
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching group info:', error);
    return res.status(500).send('Error fetching group info');
  }
}

export async function getGroupMarks(req: Request, res: Response) {
  const groupId = Number(req.params.groupId);
  try {
    const data = await kundelik.getGroupMarks(groupId);
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching group marks:', error);
    return res.status(500).send('Error fetching group marks');
  }
}

export async function getPersonMarks(req: Request, res: Response) {
  const personId = Number(req.params.personId);
  const schoolId = Number(req.params.schoolId);
  try {
    const data = await kundelik.getPersonMarks(personId, schoolId);
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching person marks:', error);
    return res.status(500).send('Error fetching person marks');
  }
}
