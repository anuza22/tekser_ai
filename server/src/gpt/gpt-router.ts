import { Router } from 'express';
import GptService from './gpt-service';
import GptController from './gpt-controller';
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const gptRouter = Router();

const gptService = new GptService();
const gptController = new GptController(gptService);

gptRouter.post('/marks', upload.array('files', 5), gptController.checkHW);

export default gptRouter;
