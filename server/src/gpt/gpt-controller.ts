// import { Request, Response } from "express";
// import { userPrompt } from "./prompt";
// import * as path from 'path';
// import GPTservice from "./gpt-service";

// class GptController{
//     private userService: GPTservice;

//     constructor(userService: GPTservice){
//         this.userService = userService;
//     }

//     checkHW = async (req: Request, res: Response) => {
//         // const userPrompt = req.body.url;
//         const imagePaths = [
//             "https://schoolhack.kz/wp-content/uploads/2023/08/img_6397-scaled-1-768x1024.jpeg", 
//             "https://schoolhack.kz/wp-content/uploads/2023/08/img_6398-scaled-1-768x1024.jpeg",
//             "https://img.freepik.com/premium-photo/watercolor-paper-texture-background-with-clipping-path-white-paper-sheet-with-torn-edges-isolated-gray-art-paper-high-quality-texture-high-resolution_64749-3881.jpg",
//             "https://img.freepik.com/premium-photo/watercolor-paper-texture-background-with-clipping-path-white-paper-sheet-with-torn-edges-isolated-gray-art-paper-high-quality-texture-high-resolution_64749-3881.jpg",
//             "https://img.freepik.com/premium-photo/watercolor-paper-texture-background-with-clipping-path-white-paper-sheet-with-torn-edges-isolated-gray-art-paper-high-quality-texture-high-resolution_64749-3881.jpg"          ];
//           console.log(imagePaths)
//         // console.log("Req:")
//         // console.log(userPrompt)
//         // console.log("req ends")
//         // const prompt = userPrompt;
//         try{
//             const response = await this.userService.checkHW(imagePaths);
//             res.status(200).json(response);
//         } catch (error: any) {
//             res.status(500).json({ error: error.message });
//           }
//     };

// }

// export default GptController;

import { Request, Response } from "express";
import GPTservice from "./gpt-service";

class GptController {
  private userService: GPTservice;

  constructor(userService: GPTservice) {
    this.userService = userService;
  }

  checkHW = async (req: Request, res: Response) => {
    const { imageUrls } = req.body;

    if (!Array.isArray(imageUrls) || imageUrls.length > 5) {
      return res.status(400).json({ error: "You must provide an array of up to 5 image URLs." });
    }

    try {
      const response = await this.userService.checkHW(imageUrls);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default GptController;
