


const express = require('express');
const configureMulterFile = require('../helpers/mutlerFile');
const fs = require('fs').promises;
const generateUniqueFilename = require('../helpers/fileNameGenerator')
const path = require('path');
const convertPdfBufferToImage = require('../helpers/pdfthumbnail');


const router = express.Router();

const multerFile = configureMulterFile();

const pdfUploadPath = path.join(__dirname, '../../database/pdf');
const pdfUploadThumbPath = path.join(__dirname, '../../database/pdf-thumbnail');


router.post('/', multerFile.single('file'), async (req, res) => {
  try {


    const imageDescription = req.body.description;
    const fileBuffer = req.file.buffer;

    console.log("looking fore the file buffer length", req.file.buffer.length)


    const originalFileName = generateUniqueFilename(req.file.originalname);
    const originalFilePath = path.join(pdfUploadPath, originalFileName);
    await fs.writeFile(originalFilePath, fileBuffer);

    const thumbnailFileName = `${originalFileName}.thumbnail`;

    const serverRoot = path.join(__dirname, '../../../');
    const relativeOriginalPath = path.relative(serverRoot, originalFilePath);
   

    const thumbNail = await convertPdfBufferToImage(fileBuffer, thumbnailFileName, 100, 100);

    console.log("here is the relative path test for oringal pdf", relativeOriginalPath)

    console.log("relative path test from inside my pdf route for thumbnail", thumbNail);

    res.json({ message: 'Image uploaded successfully.', imageDescription, thumbNail });

  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;