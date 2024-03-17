


const express = require('express');
const configureMulterFile = require('../helpers/mutlerFile');
const fs = require('fs').promises;
const path = require('path');
const imageUpload = require('../helpers/uploadImageAndThumbnail');
const createContact = require('../../database/queries/create_entity_record');
const addAddress = require('../../database/queries/add_address');
const addSupplier = require('../../database/queries/add_supplier');
const getContactClass = require('../../database/queries/get_all_contact_class');
const getContactType = require('../../database/queries/get_all_entity_class');
const getAllPhoneType = require('../../database/queries/get_all_phone_type');
const getAllEmailType = require('../../database/queries/get_all_email_type');
const getAllSocialMediaType = require('../../database/queries/get_all_social_media_type');
const getAllCountry =         require('../../database/queries/get_all_country');
const getAllProvince =        require('../../database/queries/get_all_province');
const getSupplierType = require('../../database/queries/get_all_supplier_type');
const getContactClassId =     require('../../database/queries/get_entity_class_id_by_name');
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

    const contactType = "Supplier"
    const allType = await getSupplierType();
    const contactTypeId = await getContactClassId(contactType);
    const allCountry = await getAllCountry();
    const allProvince = await getAllProvince();
    const allEmailType = await getAllEmailType();
    const allPhoneType = await getAllPhoneType();
    const allSocialMediaType = await getAllSocialMediaType();

    console.log('here are the all supplier type crap', allType);

    const creationDetails = {
      allType,
      contactTypeId,
      allCountry,
      allProvince,
      allEmailType,
      allPhoneType,
      allSocialMediaType
    }





    res.json({creationDetails });


  } catch (error) {
    console.error('Error Rendering Create Supplier Page:', error);
    res.status(500).send('Internal Server Error');
  }
  
});


router.post('/generate', multerFile.single('file'), async (req, res) => {
  try {

    const fileDescription = req.body.description;
    const fileBuffer = req.file ? req.file.buffer : null;
    const originalFileName = req.file ? req.file.originalname : null;
    let imageId = null;
    const supplierName = req.body.name;
    const establishment = true;

    // if logo included upload
    if (fileBuffer) {
      const result = await imageUpload(fileDescription, fileBuffer, originalFileName);
      imageId = result && result.image ? result.image.id : null;
    }

    const entityClass = "3";
    const entityType = req.body.entityType


    const entityId = await createContact(entityClass, entityType, establishment)

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

    console.log("entity id test:", entityId)

    const supplierAddress = {
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

    const supplier = {
      entityId,
      supplierName,
      imageId
    }

    const addedSupplier = await addSupplier(supplier);
    
    const addedAddress = await addAddress(supplierAddress);

    console.log("here is the id from the new address submiuttion", addedAddress)

    console.log("here is the added supplier if return from query: ", addedSupplier)

    const dataTest = {
      supplierName,
      streetOne : supplierAddress.streetOne,
      streetTwo : supplierAddress.streetTwo,
      cty : supplierAddress.city,
      province : supplierAddress.province,
      country : supplierAddress.country,
      postal : supplierAddress.postal,
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