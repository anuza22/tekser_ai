import Jimp from 'jimp';

// Определение типа для аннотаций
export interface Annotation {
  position: { x: number, y: number };
  text: string;
  color: string;
}

// Функция для аннотирования изображения
export async function annotateImage(imagePath: string, outputPath: string, annotations: Annotation[]): Promise<void> {
  try {
    const image = await Jimp.read(imagePath);

    // Загрузка шрифтов
    const fontBlack = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    const fontRed = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    const fontGreen = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);

    annotations.forEach(annotation => {
      const { position, text, color } = annotation;

      let font;
      switch (color.toLowerCase()) {
        case 'red':
          font = fontRed;
          break;
        case 'green':
          font = fontGreen;
          break;
        default:
          font = fontBlack;
          break;
      }

      image.print(font, position.x, position.y, {
        text: text,
        alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
        alignmentY: Jimp.VERTICAL_ALIGN_TOP
      }, image.bitmap.width, image.bitmap.height);
    });

    await image.writeAsync(outputPath);
    console.log(`Annotated image saved to ${outputPath}`);
  } catch (error) {
    console.error('Error annotating image:', error);
  }
}


