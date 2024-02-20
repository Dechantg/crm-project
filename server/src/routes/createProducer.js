


const express = require('express');
const configureMulterFile = require('../helpers/mutlerFile');
const fs = require('fs').promises;
const path = require('path');
const imageUpload = require('../helpers/uploadImageAndThumbnail')
const createContact = require('../../database/queries/create_contact')


const router = express.Router();

const multerFile = configureMulterFile();

// const imageUploadPath = path.join(__dirname, '../../database/images');
// const imageUploadThumbPath = path.join(__dirname, '../../database/images-thumb');
// const userId = 1


router.post('/', multerFile.single('file'), async (req, res) => {
  try {

    const fileDescription = req.body.description;
    const fileBuffer = req.file ? req.file.buffer : null;
    const originalFileName = req.file ? req.file.originalname : null;
    let imageId = null;

    // if logo included upload
    if (fileBuffer) {
      const result = await imageUpload(fileDescription, fileBuffer, originalFileName);
      imageId = result && result.image ? result.image.id : null;
    }

    const contactClass = "Producer"

    const contactId = await createContact(contactClass)

    console.log("Contact id test:", contactId)

    const producerName = req.body.name;
    const producerStreetOne = req.body.street1;
    const producerStreetTwo = req.body.street2;
    const producerCity = req.body.city;
    const producerProvince = req.body.province;
    const producerCountry = req.body.country;
    const producerPostal = req.body.postal




    const dataTest = {
      producerName,
      producerStreetOne,
      producerStreetTwo,
      producerCity,
      producerProvince,
      producerCountry,
      producerPostal,
      fileDescription,
      imageId
    }


    console.log("here are my various input fields, this should be the one with just image info: ", dataTest)


    res.json({ message: 'Image uploaded successfully.', dataTest });
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;