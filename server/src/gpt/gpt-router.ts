import { Router } from 'express';
import GptService from './gpt-service';
import GptController from './gpt-controller';
import multer from "multer";
import express, { Request, Response } from 'express';


const upload = multer({ storage: multer.memoryStorage() });

const gptRouter = Router();

const gptService = new GptService();
const gptController = new GptController(gptService);

gptRouter.post('/homework', upload.array('files', 5), gptController.checkHW);
// gptRouter.post('/sor_soch', upload.fields([{ name: 'empty_template' }, { name: 'student_work' }]), gptController.checkSorSoch);
gptRouter.post('/sor_soch', upload.fields([
    { name: 'empty_template', maxCount: 5 },
    { name: 'student_work', maxCount: 5 }
]),gptController.checkSorSoch );


export default gptRouter;
