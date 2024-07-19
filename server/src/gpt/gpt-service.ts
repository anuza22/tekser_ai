import OpenAI from 'openai';
import { systemPrompt } from './prompt';
import { Mark } from './models/types';
import SearchLinks from '../api/getBrowserData';
import Jimp from 'jimp';
import axios from 'axios';
import { uploadFile } from '../middlewares/s3-middleware';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const DEFAULT_IMAGE_URL = "https://anuza.s3.eu-north-1.amazonaws.com/whitejpeg.jpeg";

async function annotateImageInMemory(imageUrl: string, correctPositions: { x: number, y: number }[], wrongPositions: { x: number, y: number }[]): Promise<Buffer> {
  try {
    // Загрузка изображения из URL
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(imageResponse.data, 'binary');
    const image = await Jimp.read(imageBuffer);

    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);

    // Аннотируем правильные позиции
    correctPositions.forEach(position => {
      image.print(font, position.x, position.y, 'Correct', Jimp.HORIZONTAL_ALIGN_LEFT, Jimp.VERTICAL_ALIGN_TOP);
      image.scan(position.x - 10, position.y - 10, 20, 20, function (x, y, idx) {
        this.bitmap.data[idx + 0] = 0;   // красный
        this.bitmap.data[idx + 1] = 255; // зеленый
        this.bitmap.data[idx + 2] = 0;   // синий
      });
    });

    // Аннотируем неправильные позиции
    wrongPositions.forEach(position => {
      image.print(font, position.x, position.y, 'Wrong', Jimp.HORIZONTAL_ALIGN_LEFT, Jimp.VERTICAL_ALIGN_TOP);
      image.scan(position.x - 10, position.y - 10, 20, 20, function (x, y, idx) {
        this.bitmap.data[idx + 0] = 255; // красный
        this.bitmap.data[idx + 1] = 0;   // зеленый
        this.bitmap.data[idx + 2] = 0;   // синий
      });
    });

    return await image.getBufferAsync(Jimp.MIME_JPEG);
  } catch (error) {
    console.error('Error annotating image:', error);
    throw error;
  }
}

class GPTservice {
  async checkHW(imagePaths: string[], subject: string, grade: number, language: string, kidness: number, maxScore: number) {
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
        .replace("{maxScore}", `${maxScore}`)
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

      console.log(response.choices);
      const resContent = response.choices[0].message.content;

      if (resContent) {
        const parsedRes = JSON.parse(resContent);
        console.log(parsedRes);
        if (parsedRes.google_search_query) {
          const searchLinks = await SearchLinks(parsedRes.google_search_query);
          parsedRes.searchLinks = searchLinks.map(item => item.link);
        }
        console.log(parsedRes.searchLinks);

        // Аннотируем изображение в памяти
        const annotatedImageBuffer = await annotateImageInMemory(
          filledImagePaths[1],
          parsedRes.correct_problems_positions,
          parsedRes.wrong_problems_positions
        );

        // Загружаем аннотированное изображение в S3
        const annotatedImageUrl = await uploadFile(process.env.AWS_S3_BUCKET_NAME!, 'annotated_image.jpg', annotatedImageBuffer);
        console.log(`Annotated image URL: ${annotatedImageUrl}`);

        parsedRes.annotatedImageUrl = annotatedImageUrl;

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