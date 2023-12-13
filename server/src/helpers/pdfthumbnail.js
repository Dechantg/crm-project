

const pdfThumbnail = require('pdf-thumbnail');

async function generatePdfThumbnail(inputPdfPath, outputImagePath, width = 100, height = 100) {
  try {
    const thumbnail = await pdfThumbnail(inputPdfPath, { width, height });
    await thumbnail.toFile(outputImagePath);
    console.log('Thumbnail generated successfully.');
  } catch (error) {
    console.error('Error generating PDF thumbnail:', error);
    throw error;
  }
}

module.exports = generatePdfThumbnail;
