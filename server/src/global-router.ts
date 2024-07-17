import { Router } from 'express';
import kundelikAuthRouter from './auth/kundelikAuth-router';
import gptRouter from './gpt/gpt-router';
// other routers can be imported here
import GptController from "./gpt/gpt-controller";
import GPTservice from "./gpt/gpt-service";

const globalRouter = Router();

globalRouter.use(kundelikAuthRouter);
globalRouter.use(gptRouter);

// other routers can be added here

export default globalRouter;
