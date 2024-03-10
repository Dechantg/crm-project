



const express = require('express');
const configureMulterFile = require('../helpers/mutlerFile');
const fs = require('fs').promises;
const path = require('path');
const imageUpload = require('../helpers/uploadImageAndThumbnail');
const createContact = require('../../database/queries/create_contact_record');
const addAddress = require('../../database/queries/add_address');
const addContactName = require('../../database/queries/add_contact_name');
const getContactClass = require('../../database/queries/get_all_contact_class');
const getContactType = require('../../database/queries/get_all_contact_type');
const getAllPhoneTypes = require('../../database/queries/get_all_phone_type');
const getAllEmailTypes = require('../../database/queries/get_all_email_type');



const router = express.Router();

const multerFile = configureMulterFile();

// const imageUploadPath = path.join(__dirname, process.env.IMAGE_PATH + '/images');
// const imageUploadThumbPath = path.join(__dirname, process.env.IMAGE_PATH + '/images-thumb');
// const userId = 1


router.get('/', async (req, res) => {

  try {

    const allContactClass = await getContactClass();
    const allContactType = await getContactType();
    const allEmailTypes = await getAllEmailTypes();
    const allPhoneType = await getAllPhoneTypes();



    res.render('createcontact', {allContactClass, allContactType, allEmailTypes, allPhoneType});


  } catch (error) {
    console.error('Error Rendering Create Contact Page:', error);
    res.status(500).send('Internal Server Error');
  }
  
});


router.post('/generate', multerFile.single('file'), async (req, res) => {
  try {

    const fileBuffer = req.file ? req.file.buffer : null;
    const originalFileName = req.file ? req.file.originalname : null;
    let imageId = null;
    const {contactClass, contactType, streetOne, streetTwo, city, province, country, postal, imageDescription, honorific, firstName, lastName} = req.body

    // if logo included upload
    if (fileBuffer) {
      const result = await imageUpload(imageDescription, fileBuffer, originalFileName);
      imageId = result && result.image ? result.image.id : null;
    }

    const contactId = await createContact(contactType, contactClass)

    // console.log("Contact id test:", contactId)

    const contactAddress = {
      contactId,
      contactClass,
      streetOne,
      streetTwo,
      city,
      province,
      country,
      postal
    };

    const contactName = {
      contactId,
      honorific,
      firstName,
      lastName
    }

    const addedContactName = await addContactName(contactName);
    
    const addedContactAddress = await addAddress(contactAddress);

    // console.log("here is the id from the new address submiuttion", addedAddress)

    // console.log("here is the added producer if return from query: ", addedProducer)

    // const dataTest = {
    //   producerName,
    //   streetOne : producerAddress.streetOne,
    //   streetTwo : producerAddress.streetTwo,
    //   cty : producerAddress.city,
    //   province : producerAddress.province,
    //   country : producerAddress.country,
    //   postal : producerAddress.postal,
    //   fileDescription,
    //   imageId
    // }


    // console.log("here are my various input fields, this should be the one with just image info: ", dataTest)


    res.json({ message: 'Contact Creation Rendered successfully.' });
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;