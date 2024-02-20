const express = require('express');
const configureMulterFile = require('./mutlerFile');
const generateThumbnail = require('./thumbnail');
const fs = require('fs').promises;
const generateUniqueFilename = require('./fileNameGenerator');
const path = require('path');
const addImageQuery = require('../../database/queries/add_images');

const router = express.Router();

const multerFile = configureMulterFile();

const imageUploadPath = path.join(__dirname, '../../database/images');
const imageUploadThumbPath = path.join(__dirname, '../../database/images-thumb');
const userId = 1;

const handleImageUpload = async (req, res) => {
  try {
    const fileDescription = req.body.description;
    const fileBuffer = req.file.buffer;
    const originalFileName = req.file.originalname;

    console.log("looking for the file buffer length", req.file.buffer.length);

    const thumbnailBuffer = await generateThumbnail(fileBuffer, 100, 100);

    const generatedFileName = generateUniqueFilename(originalFileName);
    const originalFilePath = path.join(imageUploadPath, generatedFileName);
    await fs.writeFile(originalFilePath, fileBuffer);

    const thumbnailFileName = generateUniqueFilename(`thumbnail_${generatedFileName}`);
    const thumbnailFilePath = path.join(imageUploadThumbPath, thumbnailFileName);
    await fs.writeFile(thumbnailFilePath, thumbnailBuffer);

    const serverRoot = path.join(__dirname, '../../../');
    const relativeOriginalPath = path.relative(serverRoot, originalFilePath);
    const relativeThumbnailPath = path.relative(serverRoot, thumbnailFilePath);

    console.log("here is the thumbPath", relativeThumbnailPath);
    console.log("here is the originalPath", relativeOriginalPath);

    const addedImageQueryResult = await addImageQuery(userId, originalFileName, generatedFileName, thumbnailFileName, fileDescription);

    console.log(addedImageQueryResult);

    res.json({ message: 'Image uploaded successfully.', fileDescription });
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = handleImageUpload;
