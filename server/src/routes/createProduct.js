


const express = require('express');
const configureMulterFile = require('../helpers/mutlerFile');
const fs = require('fs').promises;
const path = require('path');
const imageUpload = require('../helpers/uploadImageAndThumbnail');
const createContact = require('../../database/queries/create_contact');
const addAddress = require('../../database/queries/add_address');
const addProducer = require('../../database/queries/add_producer');
const getAllProducers = require('../../database/queries/get_all_producers');


const router = express.Router();

const multerFile = configureMulterFile();

// const imageUploadPath = path.join(__dirname, '../../database/images');
// const imageUploadThumbPath = path.join(__dirname, '../../database/images-thumb');
// const userId = 1

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

    console.log("is my posting being triggered at all? alch route")

    console.log("is my posting being triggered at all? nonalch route", req.body)


    const fileDescription = req.body.description;
    const fileBuffer = req.file ? req.file.buffer : null;
    const originalFileName = req.file ? req.file.originalname : null;
    let imageId = null;
    const productName = req.body.name;


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

    console.log("is my posting being triggered at all? nonalch route", req.body)


    const fileDescription = req.body.description;
    const fileBuffer = req.file ? req.file.buffer : null;
    const originalFileName = req.file ? req.file.originalname : null;
    let imageId = null;
    const productName = req.body.name;

    console.log("the alch route here is my body", req.body)


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