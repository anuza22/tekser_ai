import OpenAI from 'openai';
import { systemPrompt } from './prompt';
import { Mark } from './models/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const DEFAULT_IMAGE_URL = "https://img.freepik.com/premium-photo/watercolor-paper-texture-background-with-clipping-path-white-paper-sheet-with-torn-edges-isolated-gray-art-paper-high-quality-texture-high-resolution_64749-3881.jpg";

class GPTservice {
  async checkHW(imagePaths: string[], subject: string, grade: number, language: string, textbook: string) {
    console.log(imagePaths);
    try {
      // Ensure there are exactly 5 image URLs
      const filledImagePaths = [...imagePaths];
      while (filledImagePaths.length < 5) {
        filledImagePaths.push(DEFAULT_IMAGE_URL);
      }

      console.log(filledImagePaths);


      const prompt = systemPrompt
        .replace('{subject}', subject)
        .replace('{language}', language)
        .replace('{textbook}', textbook)
        .replace('{grade}', `${grade}`);

      const response = await openai.chat.completions.create ({
        model: "gpt-4o",
        messages: [{
                  role: "user",
                  content: [
                    { type: "text", text: prompt },
                    {
                      type: "image_url",
                      image_url: { "url": filledImagePaths[0] },
                    },
                    {
                      type: "image_url",
                      image_url: { "url": filledImagePaths[1] },
                    },
                    {
                      type: "image_url",
                      image_url: { "url": filledImagePaths[2] },
                    },
                    {
                      type: "image_url",
                      image_url: { "url": filledImagePaths[3] },
                    },
                    {
                      type: "image_url",
                      image_url: { "url": filledImagePaths[4] },
                    }
        ],},]
      });

      console.log(response.choices);
      const resContent = response.choices[0].message.content;

      if (resContent) {
        const parsedRes = JSON.parse(resContent);
        console.log(parsedRes);
        return parsedRes.mark as Mark;
      } else {
        return null;
      }
    } catch (error: any) {
      console.log(error.message+"decwecew");
      return null;
    }
  }
}

export default GPTservice;