

const sharp = require('sharp');

async function generateThumbnail(imageBuffer, width, height) {
  try {
    const thumbnailBuffer = await sharp(imageBuffer)
      .resize({ width, height })
      .toBuffer();

    return thumbnailBuffer;
  } catch (error) {
    console.error('Error generating thumbnail:', error);
    throw error;
  }
}

module.exports = generateThumbnail;