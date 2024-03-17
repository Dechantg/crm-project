

const express =               require('express');
const configureMulterFile =   require('../helpers/mutlerFile');
const fs =                    require('fs').promises;
const path =                  require('path');
const imageUpload =           require('../helpers/uploadImageAndThumbnail');
const createEntity =         require('../../database/queries/create_entity_record');
const addAddress =            require('../../database/queries/add_address');
const addClient =             require('../../database/queries/add_client');
const getClientType =       require('../../database/queries/get_all_client_type');
const getEntityType =        require('../../database/queries/get_all_entity_class');
const getAllCountry =         require('../../database/queries/get_all_country');
const getAllProvince =        require('../../database/queries/get_all_province');
const getEntityClassId =     require('../../database/queries/get_entity_class_id_by_name')
const getAllSocialMediaType = require('../../database/queries/get_all_social_media_type');
const getAllPhoneType =       require('../../database/queries/get_all_phone_type');
const getAllEmailType =       require('../../database/queries/get_all_email_type');
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
    
    const enityType = "Client"
    const allType = await getClientType();
    const entityTypeId = await getEntityClassId(enityType);
    const allCountry = await getAllCountry();
    const allProvince = await getAllProvince();
    const allEmailType = await getAllEmailType();
    const allPhoneType = await getAllPhoneType();
    const allSocialMediaType = await getAllSocialMediaType();

    // var selectedCountryId
    console.log("entity type id and name details", entityTypeId)

    const creationDetails = {
      allType,
      entityTypeId,
      allCountry,
      allProvince,
      allEmailType,
      allPhoneType,
      allSocialMediaType
    }



    res.json({creationDetails });


  } catch (error) {
    console.error('Error Rendering Create Producer Page:', error);
    res.status(500).send('Internal Server Error');
  }
  
});


router.post('/generate', multerFile.single('image'), async (req, res) => {
  try {

    const fileDescription = req.body.description;
    const fileBuffer = req.file ? req.file.buffer : null;
    const originalFileName = req.file ? req.file.originalname : null;
    let imageId = null;
    const clientName = req.body.name;
    const establishment = true;
console.log("thge req body", req.body)

    // if logo included upload
    if (fileBuffer) {
      const result = await imageUpload(fileDescription, fileBuffer, originalFileName);
      imageId = result && result.image ? result.image.id : null;
    }

    const entityClass = "2";
    const entityType = req.body.entityType
    const entityTypeId = req.body.entityTypeId;

    console.log("there entity type thing", entityType)


    const entityId = await createEntity(entityClass, entityType, establishment)

    console.log("entity id test:", entityId)

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


    const clientAddress = {
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

    const client = {
      entityId,
      entityTypeId,
      clientName: req.body.clientName,
      imageId,
    }

    const addedClient = await addClient(client);
    
    const addedAddress = await addAddress(clientAddress);

    console.log("here is the id from the new address submiuttion", addedAddress)

    console.log("here is the added producer if return from query: ", addedClient)

    const dataTest = {
      clientName,
      streetOne : clientAddress.streetOne,
      streetTwo : clientAddress.streetTwo,
      cty : clientAddress.city,
      province : clientAddress.province,
      country : clientAddress.country,
      postal : clientAddress.postal,
      fileDescription,
      imageId
    }


    // console.log("here are my various input fields, this should be the one with just image info: ", dataTest)


    res.json({ message: 'Client Created successfully.', dataTest });
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;