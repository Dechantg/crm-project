const { fromBuffer } = require('pdf2pic');
const fs = require('fs');
const path = require('path');

async function convertPdfBufferToImage(fileBuffer, outputFileNameWithoutExtension, width = 100, height = 100) {
  const pdfUploadThumbPath = path.join(__dirname, '../../database/pdf-thumbnail');
  const options = {
    density: 100,
    saveFilename: outputFileNameWithoutExtension,
    savePath: pdfUploadThumbPath,
    format: "png",
    width: width,
    height: height
  };

  const convert = fromBuffer(fileBuffer, options);
  const pageToConvertAsImage = 1;

  try {
    const result = await convert(pageToConvertAsImage);
    console.log("Page 1 is now converted as image");

    const savedImagePath = result.path;

    const correctFilePath = path.join(pdfUploadThumbPath, `${outputFileNameWithoutExtension}.png`);

    await fs.promises.rename(savedImagePath, correctFilePath);

    const serverRoot = path.join(__dirname, '../../../');
    const relativeThumbnailPath = path.relative(serverRoot, correctFilePath);

    return relativeThumbnailPath;
  } catch (error) {
    console.error("Error converting PDF buffer to image:", error);
    throw error;
  }
}

module.exports = convertPdfBufferToImage;