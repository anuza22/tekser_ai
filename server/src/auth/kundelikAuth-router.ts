import { Router } from 'express';
import { login, getUser } from './kundelikAuth-controller';

const router = Router();

router.post('/login', login);
router.get('/user/:id', getUser);

export default router;

