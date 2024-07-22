import { Request, Response } from 'express';
import User from './models/User'; // Adjust the path according to your project structure
import { KunAPI } from './kundelik-api'; // Adjust the path according to your project structure

let kundelik: KunAPI;

// Controller to handle login
export async function login(req: Request, res: Response) {
  const { kundelikLogin, kundelikPassword } = req.body;
  
  if (!kundelikLogin || !kundelikPassword) {
    return res.status(400).send('Login and password are required');
  }

  try {
    kundelik = new KunAPI(kundelikLogin, kundelikPassword);
    await kundelik.initialize(kundelikLogin, kundelikPassword);
    const userInfo = await kundelik.getInfo();

    if (userInfo) {
      const existingUser = await User.findOne({ kundelikLogin });
      if (existingUser) {
        existingUser.kundelikToken = kundelik.token!;
        await existingUser.save();
      } else {
        const newUser = new User({
          kundelikLogin,
          kundelikPassword, // Store passwords securely in a real application
          kundelikToken: kundelik.token,
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

// Controller to fetch user by ID
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

// Controller to fetch user info
export async function getUserInfo(req: Request, res: Response) {
  try {
    const data = await kundelik.getInfo();
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching user info:', error);
    return res.status(500).send('Error fetching user info');
  }
}

// Controller to fetch user schools
export async function getUserSchools(req: Request, res: Response) {
  try {
    const data = await kundelik.getSchools();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching user schools:', error);
    return res.status(500).send('Error fetching user schools');
  }
}

// Controller to fetch user edu groups
export async function getUserEduGroups(req: Request, res: Response) {
  try {
    const data = await kundelik.getEduGroups();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching user edu groups:', error);
    return res.status(500).send('Error fetching user edu groups');
  }
}

// Controller to fetch user context
export async function getUserContext(req: Request, res: Response) {
  try {
    const data = await kundelik.getContext();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching user context:', error);
    return res.status(500).send('Error fetching user context');
  }
}

// Controller to fetch person info
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

// Controller to fetch person groups
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

// Controller to fetch group info
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

// Controller to fetch group marks
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

// Controller to fetch person marks
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
