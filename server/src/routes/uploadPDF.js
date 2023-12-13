


const express = require('express');
const configureMulterFile = require('../helpers/mutlerFile');
const generateThumbnail = require('../helpers/thumbnail');
const fs = require('fs').promises;
const generateUniqueFilename = require('../helpers/fileNameGenerator')
const path = require('path');


const router = express.Router();

const multerFile = configureMulterFile();

const pdfUploadPath = path.join(__dirname, '../../database/pdf');
const pdfUploadThumbPath = path.join(__dirname, '../../database/pdf-thumbnail');


router.post('/', multerFile.single('file'), async (req, res) => {
  try {


    const imageDescription = req.body.description;
    const fileBuffer = req.file.buffer;

    console.log("looking fore the file buffer length", req.file.buffer.length)

    // const thumbnailBuffer = await generateThumbnail(fileBuffer, 100, 100);

    const originalFileName = generateUniqueFilename(req.file.originalname);
    const originalFilePath = path.join(pdfUploadPath, originalFileName);
    await fs.writeFile(originalFilePath, fileBuffer);

    // const thumbnailFileName = generateUniqueFilename(`thumbnail_${originalFileName}`);
    // const thumbnailFilePath = path.join(imageUploadThumbPath, thumbnailFileName);
    // await fs.writeFile(thumbnailFilePath, thumbnailBuffer);

    res.json({ message: 'Image uploaded successfully.', imageDescription });
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;