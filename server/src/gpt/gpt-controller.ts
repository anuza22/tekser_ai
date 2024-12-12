import { preprocessImage } from "./preprocces";
import { Request, Response } from "express";
import GPTservice from "./gpt-service";
import { uploadFile } from "../middlewares/s3-middleware";
import multer from "multer";
import axios from "axios";

const upload = multer({ storage: multer.memoryStorage() });

class GptController {
  private userService: GPTservice;

  constructor(userService: GPTservice) {
    this.userService = userService;
  }

  checkHW = async (req: Request, res: Response) => {
    const { subject, grade, language, kidness, maxScore, evaluationCriteria } = req.body;

    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(400).json({ error: "You must provide at least one file." });
    }

    const files = req.files as Express.Multer.File[];

    const uploadedFileLinks = [] as string[];

    try {
      // Проходим по каждому файлу и загружаем его в S3
      for (const file of files) {
        const { buffer, originalname } = file;

        const processedBuffer = await preprocessImage(buffer);


        // Загружаем файл в S3
        const s3Url = await uploadFile(process.env.AWS_S3_BUCKET_NAME!, originalname, buffer);

        if (s3Url) {
          console.log(s3Url)
          uploadedFileLinks.push(s3Url); // Добавляем публичную ссылку на файл в массив
        }
      }

      // Вызываем ваш сервис для обработки файлов и других параметров
      console.log(uploadedFileLinks);
      const response = await this.userService.checkHW(uploadedFileLinks, subject, grade, language, kidness, maxScore, evaluationCriteria );
      console.log(response);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  checkSorSoch = async (req: Request, res: Response) => {
    const { subject, grade, language, kindness, maxScore, evaluationCriteria } = req.body;

    if (!req.files || !req.files['empty_template'] || !req.files['student_work']) {
      console.log('errorrrrrrrrrr');    

      return res.status(400).json({ error: "You must provide empty templates and student works." });
    }

    const emptyTemplates = req.files['empty_template'] as Express.Multer.File[];
    const studentWorks = req.files['student_work'] as Express.Multer.File[];

    console.log("empty", emptyTemplates );
    console.log("studentWorks", studentWorks )

    if (!emptyTemplates || !studentWorks) {
      return res.status(400).json({ error: "You must provide both empty template and student work files." });
    }

    const emptyTemplates_s3 = [] as string[];
    const studentWorks_s3 = [] as string[];


    try {

      for (const file of emptyTemplates){
        const { buffer, originalname } = file;

        const processedBuffer = await preprocessImage(buffer);


        const s3Url = await uploadFile(process.env.AWS_S3_BUCKET_NAME!, originalname, buffer);

        if (s3Url) {
          console.log(s3Url)
          emptyTemplates_s3.push(s3Url); // Добавляем публичную ссылку на файл в массив
        }

        

      }

      for (const file of studentWorks) {
        const { buffer, originalname } = file;

        const processedBuffer = await preprocessImage(buffer);


        // Загружаем файл в S3
        const s3Url = await uploadFile(process.env.AWS_S3_BUCKET_NAME!, originalname, buffer);

        if (s3Url) {
          console.log(s3Url)
          studentWorks_s3.push(s3Url); // Добавляем публичную ссылку на файл в массив
        }
      }


      console.log("empty", emptyTemplates_s3 );
      console.log("studentWorks", studentWorks_s3 )


      const response = await this.userService.checkSorSoch(emptyTemplates_s3, studentWorks_s3, subject, grade, language, kindness, maxScore, evaluationCriteria);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };


}

export default GptController;
