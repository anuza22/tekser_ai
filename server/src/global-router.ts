import { Router } from 'express';
import kundelikRouter from './auth/kundelik-router';
import gptRouter from './gpt/gpt-router';

const globalRouter = Router();

globalRouter.use(kundelikRouter);
globalRouter.use(gptRouter);

// other routers can be added here

export default globalRouter;
