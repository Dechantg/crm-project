



const express = require('express');
const configureMulterFile = require('../helpers/mutlerFile');
const fs = require('fs').promises;
const path = require('path');
const imageUpload = require('../helpers/uploadImageAndThumbnail');
const createEntity = require('../../database/queries/create_entity_record');
const addAddress = require('../../database/queries/add_address');
const addContact = require('../../database/queries/add_contact_name');
const getContactClass = require('../../database/queries/get_all_contact_class');
const getContactType = require('../../database/queries/get_all_entity_class');
const getAllPhoneType = require('../../database/queries/get_all_phone_type');
const getAllEmailType = require('../../database/queries/get_all_email_type');
const getAllSocialMediaType = require('../../database/queries/get_all_social_media_type');
const getAllEntityClass = require ('../../database/queries/get_all_entity_class');

const getAllCountry =         require('../../database/queries/get_all_country');
const getAllProvince =        require('../../database/queries/get_all_province');

const addPhoneNumbers = require('../../database/queries/add_phone');
const addEmails = require('../../database/queries/add_email');
const addSocialMedia = require('../../database/queries/add_social_media');


const router = express.Router();

const multerFile = configureMulterFile();

// const imageUploadPath = path.join(__dirname, process.env.IMAGE_PATH + '/images');
// const imageUploadThumbPath = path.join(__dirname, process.env.IMAGE_PATH + '/images-thumb');
// const userId = 1


router.get('/', async (req, res) => {

  try {

    const allEntityClass = await getAllEntityClass();
    const allContactClass = await getContactClass();
    const allCountry = await getAllCountry();
    const allProvince = await getAllProvince();
    const allContactType = await getContactType();
    const allEmailType = await getAllEmailType();
    const allPhoneType = await getAllPhoneType();
    const allSocialMediaType = await getAllSocialMediaType();

    const creationDetails = {
      allEntityClass,
      allContactClass,
      allContactType,
      allCountry,
      allProvince,
      allEmailType,
      allPhoneType,
      allSocialMediaType,
    }


    res.json({creationDetails });




  } catch (error) {
    console.error('Error Rendering Create Contact Page:', error);
    res.status(500).send('Internal Server Error');
  }
  
});


router.post('/generate', multerFile.single('file'), async (req, res) => {
  try {

    const establishment = false;

    firstName = req.body.contactFirstName;
    lastName = req.body.contactLastName;
    honorific = req.body.contactHonorific;
    entityClass = req.body.entityClassId;
    entityType = req.body.entityType;


    const entityId = await createEntity(entityClass, entityType, establishment);

    console.log("entity id test:", entityId);

    if (req.body.socialMediaRows) {
      const socialMedia = JSON.parse(req.body.socialMediaRows);
      
      if (Array.isArray(socialMedia) && socialMedia.some(obj => obj.socialType !== '' || obj.socialmedia !== '')) {
        await addSocialMedia(entityId, socialMedia);
        
        console.log("Social Media with EntityId", socialMedia);
      } else {
        console.log("Social Media Rows Object is empty");
      }
    } 


    if (req.body.emailRows !== 'undefined' && req.body.emailRows !== '') {
      const emails = JSON.parse(req.body.emailRows);
      await addEmails(entityId, emails);

    console.log("emails after adding entityId", emails);
    } else {
      console.log("Emails object empty")
    }


    if (req.body.phoneNumberRows !== 'undefined' && req.body.phoneNumberRows !== '') {
      const phoneNumbers = JSON.parse(req.body.phoneNumberRows);

      await addPhoneNumbers(entityId, phoneNumbers)

    console.log("phone numbers object", phoneNumbers);
    } else {
      console.log("phone numbers object empty")
    }



    const contactAddress = {
      entityId,
      establishment,
      entityClass: entityClass,
      streetOne : req.body.streetOne,
      streetTwo : req.body.streetTwo,
      city : req.body.city,
      province : req.body.provinceId,
      country : req.body.countryId,
      postal : req.body.postalCode
    };

    const contact = {
      entityId,
      contactClass : req.body.entityTypeId,
      honorific,
      firstName,
      lastName
    }

    const addedContactName = await addContact(contact);
    
    const addedContactAddress = await addAddress(contactAddress);

   


    res.json({ message: 'Contact Creation Rendered successfully.' });
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;