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
    const api = new KunAPI(kundelikLogin, kundelikPassword);
    // await api.initialize(kundelikLogin, kundelikPassword);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const userInfo = await api.getInfo();
    const userContext = await api.getContext();

    if (userInfo && userContext) {
      let user = await User.findOne({ kundelikLogin });

      if (user) {
        user.kundelikToken = api.token!;
        user.schoolName = userContext.schoolName;
        user.className = userContext.className;
        user.subjectName = userContext.subjectName;
        user.userRole = userContext.userRole;
      } else {
        user = new User({
          id: userInfo.id,
          id_str: userInfo.id_str,
          personId: userInfo.personId,
          personId_str: userInfo.personId_str,
          kundelikLogin,
          kundelikPassword,
          kundelikToken: api.token,
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
      }

      await user.save();
      return res.status(200).json({ user, token: api.token });
    } else {
      return res.status(500).send('Failed to retrieve user info from Kundelik.kz');
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).send(`Failed to log in to Kundelik.kz: ${error}`);
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
