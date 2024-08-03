// import sharp from 'sharp';

// export const preprocessImage = async (imageBuffer: Buffer): Promise<Buffer> => {
//   try {
//     const processedImageBuffer = await sharp(imageBuffer)
//       .resize(1024, 1024, { fit: 'inside' })
//       .greyscale()
//       .normalize()
//       .sharpen()
//       .toBuffer();

//     return processedImageBuffer;
//   } catch (error) {
//     console.error('Error processing image:', error);
//     throw new Error('Failed to process image.');
//   }
// };

import Jimp from 'jimp';

export const preprocessImage = async (imageBuffer: Buffer): Promise<Buffer> => {
  try {
    const image = await Jimp.read(imageBuffer);

    image
      .resize(1024, Jimp.AUTO) // Изменение размера изображения
      .greyscale()             // Преобразование в оттенки серого
      .normalize()             // Нормализация изображения
      .contrast(1)             // Увеличение контрастности
      .quality(100);           // Установка качества изображения

    return await image.getBufferAsync(Jimp.MIME_JPEG);
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error('Failed to process image.');
  }
};

