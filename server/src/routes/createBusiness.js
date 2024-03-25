

const express =               require('express');
const configureMulterFile =   require('../helpers/mutlerFile');
const fs =                    require('fs').promises;
const path =                  require('path');
const imageUpload =           require('../helpers/uploadImageAndThumbnail');
const createEntity =         require('../../database/queries/create_entity_record');
const addAddress =            require('../../database/queries/add_address');
const addClient =             require('../../database/queries/add_client');
const getEntityType =       require('../../database/queries/get_all_entity_type');
const getAllCountry =         require('../../database/queries/get_all_country');
const getAllProvince =        require('../../database/queries/get_all_province');
const getEntityClassId =     require('../../database/queries/get_entity_class_id_by_name')
const getAllSocialMediaType = require('../../database/queries/get_all_social_media_type');
const getAllPhoneType =       require('../../database/queries/get_all_phone_type');
const getAllEmailType =       require('../../database/queries/get_all_email_type');
const addPhoneNumbers = require('../../database/queries/add_phone');
const addEmails = require('../../database/queries/add_email');
const addSocialMedia = require('../../database/queries/add_social_media');
const addSalesAssignment = require('../../database/queries/add_sales_assignment');
const addClientContact = require('../../database/queries/add_client_contact');
const buildContactObject = require('../helpers/contactObjectBuilder');
const getAllEntityClass = require ('../../database/queries/get_all_entity_class');

const addEntityClassRecord = require('../../database/queries/add_enity_class_record')


const addBusinessContactRecord = require('../../database/queries/add_business_contact_record');



const router = express.Router();

const multerFile = configureMulterFile();

// const imageUploadPath = path.join(__dirname, process.env.IMAGE_PATH + '/images');
// const imageUploadThumbPath = path.join(__dirname, process.env.IMAGE_PATH + '/images-thumb');
// const userId = 1


router.get('/', async (req, res) => {

  try {
    
    const establishment = true;
    const allEntityClass = await getAllEntityClass();
    const allType = await getEntityType(establishment);
    
    // const allContactEntityType = await getEntityType(contact);
    const allCountry = await getAllCountry();
    const allProvince = await getAllProvince();
    const allEmailType = await getAllEmailType();
    const allPhoneType = await getAllPhoneType();
    const allSocialMediaType = await getAllSocialMediaType();


    const allContact = await buildContactObject()


    const creationDetails = {
      allType,
      allCountry,
      allProvince,
      allEmailType,
      allPhoneType,
      allSocialMediaType,
      allContact,
      allEntityClass,
    };



    res.json({creationDetails });


  } catch (error) {
    console.error('Error Rendering Create Producer Page:', error);
    res.status(500).send('Internal Server Error');
  }
  
});


router.post('/generate', multerFile.single('image'), async (req, res) => {
  try {

    userId = '1';
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

    const contactEntityId = req.body.contactEntityId;
    const agentEntityId = req.body.agentEntityId;
    const entityType = req.body.entityType
    const entityTypeId = req.body.entityTypeId;

    console.log("there entity type thing", entityType)


    const entityId = await createEntity(entityClass, entityType, establishment)

    console.log("entity id test:", entityId);



    if (req.body.entityClassRows !== 'undefined' && req.body.entityClassRows !== '') {
      const entityClass = JSON.parse(req.body.entityClassRows);
      await addEntityClassRecord(entityId, entityClass);

    console.log("entity class record after adding entityId", entityClass);
    } else {
      console.log("Entity Class object empty")
    }




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

    if (req.body.contactRows !== 'undefined' && req.body.contactRows !== '') {
      const entityContact = JSON.parse(req.body.contactRows);
      await addBusinessContactRecord(entityId, userId, entityContact);

    console.log("entity class record after adding entityId", entityContact);
    } else {
      console.log("Entity Class object empty")
    }

    if (req.body.entityClassRows !== 'undefined' && req.body.entityClassRows !== '') {
      const entityClass = JSON.parse(req.body.entityClassRows);
      // await addEntityClassRecord(entityId, entityClass);

    } else {
      console.log("Enity Class object empty")
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

    const clientContact = {
      clientId: entityId,
      contactEntityId,
      userId,
    };

    const salesAgentAssignment = {
      clientEntityId: entityId,
      salesAgentEntityId: agentEntityId,
      userId,
    };

    await addClientContact(clientContact);
    await addSalesAssignment(salesAgentAssignment);



    res.json({ message: 'Client Created successfully.' });
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;