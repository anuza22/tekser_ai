import { Router } from 'express';
import {
  login,
  getUserInfo,
  getUserSchools,
  getUserEduGroups,
  getUserContext,
  getPersonInfo,
  getPersonGroups,
  getGroupInfo,
  getGroupMarks,
  getPersonMarks,
} from './kundelik-controller';

const router = Router();

router.post('/login', login);
router.get('/userinfo', getUserInfo);
router.get('/userschools', getUserSchools);
router.get('/useredugroups', getUserEduGroups);
router.get('/usercontext', getUserContext);
router.get('/personinfo/:personId', getPersonInfo);
router.get('/persongroups/:personId', getPersonGroups);
router.get('/groupinfo/:groupId', getGroupInfo);
router.get('/groupmarks/:groupId', getGroupMarks);
router.get('/personmarks/:personId', getPersonMarks);

export default router;
