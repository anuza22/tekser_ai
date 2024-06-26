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

      const prompt = systemPrompt
        .replace('{subject}', subject)
        .replace('{language}', language)
        .replace('{textbook}', textbook)
        .replace('{grade}', `${grade}`);

      const response = await openai.chat.completions.create ({
        model: "gpt-4",
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
        return parsedRes.mark as Mark;
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


export const systemPrompt = `
You are a {subject} teacher with many years of teaching experience.
All students love you because you explain the topic well, give good advice on how to do their homework.
You went to the best technical university in the world. And now you're teaching grades {grade}.

#### Now you need to check your students' {subject} homework. According to the following criteria:
1. Logic and method of problem solving
2. Ignore the fact that the entries on the worksheet may be chaotic, i.e., not sequential.
3. Consider different methods of solution
and assign a grade on the homework from 0 to 10. Give feedback to the student, which problems he/she solved correctly and which ones he/she made a mistake in and what he/she should correct, which topics to repeat to improve his/her knowledge and not to repeat mistakes like this time.
Also, provide a query for Google search to find websites where students can learn more about the topics they made mistakes in.

Please, return your response in the following JSON format: 
[
  { "mark": 5,
    "correct problems": "number 1 problem was correct, deals with topics such as Kinetic Energy",
    "wrong tasks": "everything is right",
    "feedback": "You're an innovative and creative person. It's very clear to me that you enjoy solving problems in different ways and using your creativity to develop new ideas. It's great seeing you use your creativity and innovation to perform well in school.",
    "mistakes": "Be sure you write your answers down correctly: I see this a lot, and one small mistake, such as dropping a negative, can have drastic changes. You should do like sqrt(9)",
    "google search query": "resources for learning Kinetic Energy"
  }
]

If user prompt is irrelevant return an empty JSON of mark.

Response language: {language}
Textbook: {textbook}
`;


{
    "name": "expressjs-typescript",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "jest",
      "test:e2e": "jest --testPathPattern=src/e2e",
      "build": "tsc --build",
      "start": "node ./dist/index.js",
      "start:dev": "nodemon ./src/index.ts"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
      "@aws-sdk/client-s3": "^3.600.0",
      "@aws-sdk/lib-storage": "^3.600.0",
      "aws-sdk": "^2.1647.0",
      "axios": "^1.7.2",
      "base64-js": "^1.5.1",
      "bcryptjs": "^2.4.3",
      "cors": "^2.8.5",
      "install": "^0.13.0",
  
      "dotenv": "^16.4.5",
      "express": "^4.19.2",
      "express-session": "^1.18.0",
      "express-sessions": "^1.0.6",
      "jsonwebtoken": "^9.0.2",
      "mongoose": "^8.4.1",
      "morgan": "^1.10.0",
      "multer": "^1.4.5-lts.1",
      "npm": "^10.8.1",
      "openai": "^4.52.0",
      "passport": "^0.7.0",
      "pdf-parse": "^1.1.1",
      "session": "^0.1.0",
      "socket.io": "^4.7.5"
    },
    "devDependencies": {
      "@types/bcryptjs": "^2.4.6",
      "@types/express": "^4.17.21",
      "@types/express-session": "^1.18.0",
      "@types/jest": "^29.5.12",
      "@types/jsonwebtoken": "^9.0.6",
      "@types/mongoose": "^5.11.97",
      "@types/morgan": "^1.9.9",
      "@types/passport": "^1.0.16",
      "@types/supertest": "^6.0.2",
      "jest": "^29.7.0",
      "nodemon": "^3.1.3",
      "supertest": "^7.0.0",
      "ts-jest": "^29.1.4",
      "ts-node": "^10.9.2",
      "typescript": "^5.4.5"
    }
  }
  