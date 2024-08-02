import sharp from 'sharp';

export const preprocessImage = async (imageBuffer: Buffer): Promise<Buffer> => {
  try {
    const processedImageBuffer = await sharp(imageBuffer)
      .resize(1024, 1024, { fit: 'inside' })
      .greyscale()
      .normalize()
      .sharpen()
      .toBuffer();

    return processedImageBuffer;
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error('Failed to process image.');
  }
};
