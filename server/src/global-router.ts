import { Router } from 'express';
import authRouter from './auth/auth-router';
import eventRouter from './events/event-router';
import gptRouter from './gpt/gpt-router';
// other routers can be imported here
import GptController from "./gpt/gpt-controller";
import GPTservice from "./gpt/gpt-service";

const globalRouter = Router();

globalRouter.use(authRouter);
globalRouter.use(eventRouter);
globalRouter.use(gptRouter);


// other routers can be added here

export default globalRouter;
