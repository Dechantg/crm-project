

const express = require('express');
const configureMulterFile = require('../helpers/mutlerFile');
const generateThumbnail = require('../helpers/thumbnail');
const fs = require('fs').promises;
const generateUniqueFilename = require('../helpers/fileNameGenerator')
const path = require('path');


const router = express.Router();

const multerFile = configureMulterFile();

const imageUploadPath = path.join(__dirname, '../../database/images');
const imageUploadThumbPath = path.join(__dirname, '../../database/images-thumb');


router.post('/', multerFile.single('file'), async (req, res) => {
  try {


    const imageDescription = req.body.description;
    const fileBuffer = req.file.buffer;

    console.log("looking fore the file buffer length", req.file.buffer.length)

    const thumbnailBuffer = await generateThumbnail(fileBuffer, 100, 100);

    const originalFileName = generateUniqueFilename(req.file.originalname);
    const originalFilePath = path.join(imageUploadPath, originalFileName);
    await fs.writeFile(originalFilePath, fileBuffer);

    const thumbnailFileName = generateUniqueFilename(`thumbnail_${originalFileName}`);
    const thumbnailFilePath = path.join(imageUploadThumbPath, thumbnailFileName);
    await fs.writeFile(thumbnailFilePath, thumbnailBuffer);

    const serverRoot = path.join(__dirname, '../../../');
    const relativeOriginalPath = path.relative(serverRoot, originalFilePath);
    const relativeThumbnailPath = path.relative(serverRoot, thumbnailFilePath);

    console.log("here is the thumbPath", relativeThumbnailPath);
    console.log("here is the originalPath", relativeOriginalPath);


    res.json({ message: 'Image uploaded successfully.', imageDescription });
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;