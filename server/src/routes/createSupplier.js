


const express = require('express');
const configureMulterFile = require('../helpers/mutlerFile');
const fs = require('fs').promises;
const path = require('path');
const imageUpload = require('../helpers/uploadImageAndThumbnail');
const createContact = require('../../database/queries/create_contact_record');
const addAddress = require('../../database/queries/add_address');
const addSupplier = require('../../database/queries/add_supplier');
const getContactClass = require('../../database/queries/get_all_contact_class');
const getContactType = require('../../database/queries/get_all_contact_type');
const getAllPhoneType = require('../../database/queries/get_all_phone_type');
const getAllEmailType = require('../../database/queries/get_all_email_type');
const getAllSocialMediaType = require('../../database/queries/get_all_social_media_type');
const getAllCountry =         require('../../database/queries/get_all_country');
const getAllProvince =        require('../../database/queries/get_all_province');
const getSupplierType = require('../../database/queries/get_all_supplier_type')

const router = express.Router();

const multerFile = configureMulterFile();

// const imageUploadPath = path.join(__dirname, process.env.IMAGE_PATH + '/images');
// const imageUploadThumbPath = path.join(__dirname, process.env.IMAGE_PATH + '/images-thumb');
// const userId = 1


router.get('/', async (req, res) => {

  try {

    const contactType = "Supplier"
    const allSupplierType = await getSupplierType();
    const contactTypeId = await getContactClassId(contactType);
    const allCountry = await getAllCountry();
    const allProvince = await getAllProvince();
    const allEmailType = await getAllEmailType();
    const allPhoneType = await getAllPhoneType();
    const allSocialMediaType = await getAllSocialMediaType();

    const supplierDetails = {
      allSupplierType,
      contactTypeId,
      allCountry,
      allProvince,
      allEmailType,
      allPhoneType,
      allSocialMediaType
    }




    res.json({supplierDetails });


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


    // if logo included upload
    if (fileBuffer) {
      const result = await imageUpload(fileDescription, fileBuffer, originalFileName);
      imageId = result && result.image ? result.image.id : null;
    }

    const contactClass = req.body.contactClass
    const contactType = req.body.contactType

    const contactId = await createContact(contactType, contactClass)

    console.log("Contact id test:", contactId)

    const supplierAddress = {
      contactId,
      contactClass: "Supplier",
      streetOne : req.body.street1,
      streetTwo : req.body.street2,
      city : req.body.city,
      province : req.body.province,
      country : req.body.country,
      postal : req.body.postal
    };

    const supplier = {
      contactId,
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