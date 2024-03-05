

const express = require('express');
const configureMulterFile = require('../helpers/mutlerFile');
const fs = require('fs').promises;
const path = require('path');
const imageUpload = require('../helpers/uploadImageAndThumbnail');
const createContact = require('../../database/queries/create_contact_record');
const addAddress = require('../../database/queries/add_address');
const addProducer = require('../../database/queries/add_producer');
const getContactClass = require('../../database/queries/get_all_contact_class');
const getContactType = require('../../database/queries/get_all_contact_type');


const router = express.Router();

const multerFile = configureMulterFile();

// const imageUploadPath = path.join(__dirname, '../../database/images');
// const imageUploadThumbPath = path.join(__dirname, '../../database/images-thumb');
// const userId = 1


router.get('/', async (req, res) => {

  try {

    const allContactClass = await getContactClass();
    const allContactType = await getContactType();




    res.render('createproducer', {allContactClass, allContactType });


  } catch (error) {
    console.error('Error Rendering Create Producer Page:', error);
    res.status(500).send('Internal Server Error');
  }
  
});


router.post('/generate', multerFile.single('file'), async (req, res) => {
  try {

    const fileDescription = req.body.description;
    const fileBuffer = req.file ? req.file.buffer : null;
    const originalFileName = req.file ? req.file.originalname : null;
    let imageId = null;
    const producerName = req.body.name;


    // if logo included upload
    if (fileBuffer) {
      const result = await imageUpload(fileDescription, fileBuffer, originalFileName);
      imageId = result && result.image ? result.image.id : null;
    }

    const contactClass = req.body.contactClass
    const contactType = req.body.contactType

    const contactId = await createContact(contactClass, contactType)

    console.log("Contact id test:", contactId)

    const producerAddress = {
      contactId,
      addressClassification: "Producer",
      streetOne : req.body.street1,
      streetTwo : req.body.street2,
      city : req.body.city,
      province : req.body.province,
      country : req.body.country,
      postal : req.body.postal
    };

    const producer = {
      contactId,
      producerName,
      imageId
    }

    const addedProducer = await addProducer(producer);
    
    const addedAddress = await addAddress(producerAddress);

    console.log("here is the id from the new address submiuttion", addedAddress)

    console.log("here is the added producer if return from query: ", addedProducer)

    const dataTest = {
      producerName,
      streetOne : producerAddress.streetOne,
      streetTwo : producerAddress.streetTwo,
      cty : producerAddress.city,
      province : producerAddress.province,
      country : producerAddress.country,
      postal : producerAddress.postal,
      fileDescription,
      imageId
    }


    // console.log("here are my various input fields, this should be the one with just image info: ", dataTest)


    res.json({ message: 'Image uploaded successfully.', dataTest });
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;