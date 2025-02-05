import 'server-only';
import sharp from 'sharp';
import { join } from 'path';
import { readFileSync } from 'node:fs';

export async function preprocessImage(input: Buffer): Promise<Buffer | null> {
  // Image optimization settings
  const QUALITY = 80;

  // Watermark settings
  const MAX_IMAGE_SIZE = 800;
  const TILE_SPACING = 50;
  const OPACITY = 0.1;
  const ROTATION = 30;

  // Read watermark
  const watermarkPath = join(process.cwd(), 'public', 'watermark.png');
  const watermark = readFileSync(watermarkPath);

  try {
    const image = sharp(input).withMetadata().resize({
      width: MAX_IMAGE_SIZE,
      height: MAX_IMAGE_SIZE,
      fit: 'inside',
    });

    const { info } = await image.toBuffer({ resolveWithObject: true });
    const { width, height } = info;

    const { data: watermarkBuffer, info: watermarkInfo } = await sharp(
      watermark,
    )
      .ensureAlpha()
      .composite([
        {
          input: Buffer.from([0, 0, 0, Math.floor(OPACITY * 255)]),
          raw: { width: 1, height: 1, channels: 4 },
          tile: true,
          blend: 'dest-in',
        },
      ])
      .toBuffer({ resolveWithObject: true });

    const { width: watermarkWidth, height: watermarkHeight } = watermarkInfo;

    if (!width || !height || !watermarkWidth || !watermarkHeight) {
      throw new Error('Invalid image/watermark image size');
    }

    // Since the watermark pattern is rotated at the end, it needs to be bigger to cover the whole image,
    // the excess is trimmed at the end
    const watermarkPatternWidth = width * 2;
    const watermarkPatternHeight = height * 2;

    // How many watermarks fit in the width of the image
    const watermarksX = Math.ceil(
      watermarkPatternWidth / (watermarkWidth + TILE_SPACING),
    );

    // How many watermarks fit in the height of the image
    const watermarksY = Math.ceil(
      watermarkPatternHeight / (watermarkHeight + TILE_SPACING),
    );

    const watermarkPatternBuffer = await sharp({
      create: {
        width: watermarkPatternWidth,
        height: watermarkPatternHeight,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite(
        Array.from(
          {
            length: watermarksX * watermarksY,
          },
          (_, i) => {
            const x = (i % watermarksX) * (watermarkWidth + TILE_SPACING);
            const y =
              Math.floor(i / watermarksX) * (watermarkHeight + TILE_SPACING);

            return { input: watermarkBuffer, left: x, top: y };
          },
        ),
      )
      .toFormat('png')
      .toBuffer();

    const watermarkFinalBuffer = await sharp(watermarkPatternBuffer)
      .rotate(ROTATION, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .extract({
        left: width,
        top: height,
        width,
        height,
      })
      .toBuffer();

    return await image
      .composite([{ input: watermarkFinalBuffer, gravity: 'center' }])
      .webp({ quality: QUALITY })
      .toBuffer();
  } catch (e) {
    console.error('[image:preprocessImage] failed to process image:', e);
    return null;
  }
}
