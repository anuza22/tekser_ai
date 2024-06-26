import { Request, Response } from "express";
import GPTservice from "./gpt-service";
import { uploadFile } from "../middlewares/s3-middleware";
import multer from "multer"; // Подключаем multer для обработки файлов

const upload = multer(); // Настройка multer для обработки файлов


class GptController {
  private userService: GPTservice;

  constructor(userService: GPTservice) {
    this.userService = userService;
  }

  checkHW = async (req: Request, res: Response) => {
    const { imageUrls, subject, grade, language, textbook } = req.body;

    const imageLinksfromBucket = []

    for (const img in imageUrls){
      imageLinksfromBucket.push(uploadFile(img))
        
    }



    if (!Array.isArray(imageUrls) || imageUrls.length > 5) {
      return res.status(400).json({ error: "You must provide an array of up to 5 image URLs." });
    }

    if (!subject || !grade || !language || !textbook) {
      return res.status(400).json({ error: "You must provide subject, grade, language, and textbook." });
    }

    try {
      const response = await this.userService.checkHW(imageUrls, subject, grade, language, textbook);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default GptController;

