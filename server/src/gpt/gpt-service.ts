import OpenAI from 'openai';
import { systemPrompt } from './prompt';
import { Mark } from './models/types';
import SearchLinks from '../api/getBrowserData';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const DEFAULT_IMAGE_URL = "https://anuza.s3.eu-north-1.amazonaws.com/whitejpeg.jpeg";

class GPTservice {
  async checkHW(imagePaths: string[], subject: string, grade: number, language: string, kidness: number) {
    console.log(imagePaths);
    try {
      // Ensure there are exactly 5 image URLs
      const filledImagePaths = [...imagePaths];
      while (filledImagePaths.length < 6) {
        filledImagePaths.push(DEFAULT_IMAGE_URL);
      }

      console.log(filledImagePaths);

      const prompt = systemPrompt
        .replace('{subject}', subject)
        .replace('{language}', language)
        .replace('{grade}', `${grade}`)
        .replace('{kidness}', `${kidness}`);

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        response_format: {
          type: 'json_object'
        },
        messages: [{
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: { "url": filledImagePaths[1]},
            },
            {
              type: "image_url",
              image_url: { "url": filledImagePaths[2]},
            },
            {
              type: "image_url",
              image_url: { "url": filledImagePaths[3] },
            },
            {
              type: "image_url",
              image_url: { "url": filledImagePaths[4] },
            },
            {
              type: "image_url",
              image_url: { "url": filledImagePaths[5] },
            }
          ],
        }]
      });

      // console.log(response.choices);
      const resContent = response.choices[0].message.content;

      if (resContent) {
        const parsedRes = JSON.parse(resContent);
        console.log(parsedRes);
        if (parsedRes.google_search_query) {
          const searchLinks = await SearchLinks(parsedRes.google_search_query);
          parsedRes.searchLinks = searchLinks.map(item => item.link);
        }
        console.log(parsedRes.searchLinks);
        return parsedRes;
      } else {
        return null;
      }
    } catch (error: any) {
      console.log(error.message);
      return null;
    }
  }
}

export default GPTservice;
