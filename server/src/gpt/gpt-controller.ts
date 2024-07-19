// import { Request, Response } from "express";
// import GPTservice from "./gpt-service";
// import { uploadFile } from "../middlewares/s3-middleware";
// import multer from "multer";
// import { Annotation, annotateImage } from "./test";

// const upload = multer({ storage: multer.memoryStorage() });

// class GptController {
//   private userService: GPTservice;

//   constructor(userService: GPTservice) {
//     this.userService = userService;
//   }

//   checkHW = async (req: Request, res: Response) => {
//     const { subject, grade, language, kidness } = req.body;

//     // Проверяем, что в запросе есть файлы
//     if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
//       return res.status(400).json({ error: "You must provide at least one file." });
//     }

//     // Получаем массив файлов из тела запроса
//     const files = req.files as Express.Multer.File[];

//     // Массив для хранения публичных ссылок на загруженные файлы в S3
//     const uploadedFileLinks = [' '];

//     try {
//       // Проходим по каждому файлу и загружаем его в S3
//       for (const file of files) {
//         const { buffer, originalname } = file;

//         // Загружаем файл в S3
//         const s3Url = await uploadFile(process.env.AWS_S3_BUCKET_NAME!, originalname, buffer);

//         if (s3Url) {
//           console.log(s3Url)
//           uploadedFileLinks.push(s3Url); // Добавляем публичную ссылку на файл в массив
//         }
//       }

//       // Вызываем ваш сервис для обработки файлов и других параметров
//       const response = await this.userService.checkHW(uploadedFileLinks, subject, grade, language,kidness );
//       console.log(response);

//       res.status(200).json(response);
//     } catch (error: any) {
//       res.status(500).json({ error: error.message });
//     }
//   };
// }

// export default GptController;
import { Request, Response } from "express";
import GPTservice from "./gpt-service";
import { uploadFile } from "../middlewares/s3-middleware";
import multer from "multer";
import axios from "axios";
const pythonBackendUrl = 'http://localhost:5001/process-image';  // Python backend URL


const upload = multer({ storage: multer.memoryStorage() });

class GptController {
  private userService: GPTservice;

  constructor(userService: GPTservice) {
    this.userService = userService;
  }

  checkHW = async (req: Request, res: Response) => {
    const { subject, grade, language, kidness, maxScore } = req.body;

    // Проверяем, что в запросе есть файлы
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(400).json({ error: "You must provide at least one file." });
    }

    // Получаем массив файлов из тела запроса
    const files = req.files as Express.Multer.File[];

    // Массив для хранения публичных ссылок на загруженные файлы в S3
    const uploadedFileLinks = [' '];

    try {
      // Проходим по каждому файлу и загружаем его в S3
      for (const file of files) {
        const { buffer, originalname } = file;

        // Загружаем файл в S3
        const s3Url = await uploadFile(process.env.AWS_S3_BUCKET_NAME!, originalname, buffer);

        if (s3Url) {
          console.log(s3Url)
          uploadedFileLinks.push(s3Url); // Добавляем публичную ссылку на файл в массив
        }
      }

      // Вызываем ваш сервис для обработки файлов и других параметров
      const response = await this.userService.checkHW(uploadedFileLinks, subject, grade, language, kidness, maxScore );
      console.log(response);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default GptController;
