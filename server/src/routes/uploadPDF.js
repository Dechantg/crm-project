


const express = require('express');
const configureMulterFile = require('../helpers/mutlerFile');
const fs = require('fs').promises;
const generateUniqueFilename = require('../helpers/fileNameGenerator')
const path = require('path');
const convertPdfBufferToImage = require('../helpers/pdfthumbnail');
const addPdfQuery = require('../../database/queries/add_pdf')


const router = express.Router();

const multerFile = configureMulterFile();

const pdfUploadPath = path.join(__dirname, process.env.IMAGE_PATH + '/pdf');
const pdfUploadThumbPath = path.join(__dirname, process.env.IMAGE_PATH + '/pdf-thumbnail');
const userId = 1

router.post('/', multerFile.single('file'), async (req, res) => {
  try {


    const fileDescription = req.body.description;
    const fileBuffer = req.file.buffer;
    const originalFileName = req.file.originalname;
    

    console.log("looking fore the file buffer length", req.file.buffer.length)


    const generatedFileName = generateUniqueFilename(originalFileName);
    const originalFilePath = path.join(pdfUploadPath, generatedFileName);
    await fs.writeFile(originalFilePath, fileBuffer);

    const thumbnailFileName = `${generatedFileName}.thumbnail`;

    const serverRoot = path.join(__dirname, '../../../');
    const relativeOriginalPath = path.relative(serverRoot, originalFilePath);
   

    const thumbNail = await convertPdfBufferToImage(fileBuffer, thumbnailFileName, 100, 100);

    console.log("oringal pdf name test", originalFileName);


    console.log("thubmbnail name test", thumbNail);

    const addedPdfQueryResult = await addPdfQuery(userId, originalFileName, generatedFileName, thumbNail, fileDescription)

    res.json({ message: 'Image uploaded successfully.', fileDescription, thumbNail });

  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;