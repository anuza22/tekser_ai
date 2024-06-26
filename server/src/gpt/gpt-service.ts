// import OpenAI from 'openai';
// import { systemPrompt } from './prompt'; // Ensure you have the system prompt defined here
// import { Mark } from './models/types';
// import * as fs from 'fs';
// import { ChatCompletionContentPart } from 'openai/resources/chat/completions';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// class GPTservice {
//   async checkHW(imagePaths: string[]) {
//     console.log(imagePaths);
//     try {

//       if (imagePaths.length >0) {
//         const response = await openai.chat.completions.create({
//           model: "gpt-4o",
//           messages: [
//       {
//         role: "user",
//         content: [
//           { type: "text", text: systemPrompt },
//           {
//             type: "image_url",
//             image_url: {
//               "url":imagePaths[0],
//             },
//           },
//           {
//             type: "image_url",
//             image_url: {
//               "url":imagePaths[1],
//             },
//           },
//           {
//             type: "image_url",
//             image_url: {
//               "url":imagePaths[2],
//             },
//           },
//           {
//             type: "image_url",
//             image_url: {
//               "url":imagePaths[3],
//             },
//           },
//           {
//             type: "image_url",
//             image_url: {
//               "url":imagePaths[4],
//             },
//           },
//         ],
//       },
//     ],
//         });
        
//         console.log(response.choices);
//         const resContent = response.choices[0].message.content;

//         if (resContent) {
//           const parsedRes = JSON.parse(resContent);
//           return parsedRes.mark as Mark[];
//         } else {
//           return null;
//         }
//       }
//     } catch (error: any) {
//       console.log(error.message);
//       return null;
//     }
//   }
// }

// export default GPTservice;

import OpenAI from 'openai';
import { systemPromptForMath, systemPromptForPhysic } from './prompt'; // Ensure you have the system prompt defined here
import { Mark } from './models/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const DEFAULT_IMAGE_URL = "https://img.freepik.com/premium-photo/watercolor-paper-texture-background-with-clipping-path-white-paper-sheet-with-torn-edges-isolated-gray-art-paper-high-quality-texture-high-resolution_64749-3881.jpg";

class GPTservice {
  async checkHW(imagePaths: string[]) {
    console.log(imagePaths);
    try {
      // Ensure there are exactly 5 image URLs
      const filledImagePaths = [...imagePaths];
      while (filledImagePaths.length < 5) {
        filledImagePaths.push(DEFAULT_IMAGE_URL);
      }

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: systemPromptForMath },
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
              },
            ],
          },
        ],
      });

      console.log(response.choices);
      const resContent = response.choices[0].message.content;

      if (resContent) {
        const parsedRes = JSON.parse(resContent);
        return parsedRes.mark as Mark[];
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
