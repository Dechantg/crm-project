


const express = require('express');
const configureMulterFile = require('../helpers/mutlerFile');
const generateThumbnail = require('../helpers/thumbnail');
const fs = require('fs').promises;
const generateUniqueFilename = require('../helpers/fileNameGenerator')
const path = require('path');
const addImageQuery = require('../../database/queries/add_images')
const imageTest = require('../helpers/uploadImageAndThumbnail')


const router = express.Router();

const multerFile = configureMulterFile();

// const imageUploadPath = path.join(__dirname, '../../database/images');
// const imageUploadThumbPath = path.join(__dirname, '../../database/images-thumb');
// const userId = 1


router.post('/', multerFile.single('file'), async (req, res) => {
  try {

    const fileDescription = req.body.description;
    const fileBuffer = req.file.buffer;
    const originalFileName = req.file.originalname;

    console.log("post trigger check of incoming data", originalFileName)

    const imageReturnTest = await imageTest(fileDescription, fileBuffer, originalFileName);


    console.log("logging post image test helper execution")



    res.json({ message: 'Image uploaded successfully.', imageReturnTest });
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;