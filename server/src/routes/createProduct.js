
const express = require('express');
const configureMulterFile = require('../helpers/mutlerFile');
const fs = require('fs').promises;
const path = require('path');
const imageUpload = require('../helpers/uploadImageAndThumbnail');
const getAllProducers = require('../../database/queries/get_all_producers');


const router = express.Router();

const multerFile = configureMulterFile();


router.get('/', async (req, res) => {
  try {

  const producers = await getAllProducers();
  console.log("here is the producers for verification", producers)

  res.render('createproduct', { producers });

} catch (error) {
  console.error('Error retrieving image:', error);
  res.status(500).send('Internal Server Error');
}
});


router.post('/alch', multerFile.single('file'), async (req, res) => {
  try {

    const {producer, productName, alcoholicType, alcoholicPercent, volumeLitresAlch, caseFormatAlch } = req.body


    console.log("is my posting being triggered at all? nonalch route", producer)


    const fileDescription = req.body.description;
    const fileBuffer = req.file ? req.file.buffer : null;
    const originalFileName = req.file ? req.file.originalname : null;
    let imageId = null;


    // if logo included upload
    if (fileBuffer) {
      const result = await imageUpload(fileDescription, fileBuffer, originalFileName);
      imageId = result && result.image ? result.image.id : null;
    }

  


    res.json({ message: 'Product page rendered for alch.'});
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});



router.post('/nonalch', multerFile.single('file'), async (req, res) => {
  try {

    const {producer, productName, alcoholicType, volumeLitresNonAlch, caseFormatNonAlch } = req.body




    console.log("nonalch route preoducer: ", producer)
    console.log("nonalch route productName: ", productName)
    console.log("nonalch route alcohol type: ", alcoholicType)
    console.log("nonalch route volume liters: ", volumeLitresNonAlch)
    console.log("nonalch route caseformat: ", caseFormatNonAlch)



    const fileDescription = req.body.description;
    const fileBuffer = req.file ? req.file.buffer : null;
    const originalFileName = req.file ? req.file.originalname : null;
    let imageId = null;


    // if logo included upload
    if (fileBuffer) {
      const result = await imageUpload(fileDescription, fileBuffer, originalFileName);
      imageId = result && result.image ? result.image.id : null;
    }



    res.json({ message: 'Product page rendered for nonalch.'});
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;