

const express =               require('express');
const configureMulterFile =   require('../helpers/mutlerFile');
const fs =                    require('fs').promises;
const path =                  require('path');
const imageUpload =           require('../helpers/uploadImageAndThumbnail');
const createContact =         require('../../database/queries/create_contact_record');
const addAddress =            require('../../database/queries/add_address');
const addClient =             require('../../database/queries/add_client');
const getClientType =       require('../../database/queries/get_all_client_type');
const getContactType =        require('../../database/queries/get_all_contact_type');
const getAllCountry =         require('../../database/queries/get_all_country');
const getAllProvince =        require('../../database/queries/get_all_province');
const getContactClassId =     require('../../database/queries/get_contact_class_id_by_type')
const getAllSocialMediaType = require('../../database/queries/get_all_social_media_type');
const getAllPhoneType =       require('../../database/queries/get_all_phone_type');
const getAllEmailType =       require('../../database/queries/get_all_email_type');


const router = express.Router();

const multerFile = configureMulterFile();

const imageUploadPath = path.join(__dirname, process.env.IMAGE_PATH + '/images');
const imageUploadThumbPath = path.join(__dirname, process.env.IMAGE_PATH + '/images-thumb');
const userId = 1





router.post('/client-test', multerFile.single('image'), async (req, res) => {
  try {

    // console.log(req.file);

    dataTest = req.body
    // console.log("from inside the rest route the body", dataTest);

    const fileDescription = req.body.clientName;
    const fileBuffer = req.file ? req.file.buffer : null;
    const originalFileName = req.file ? req.file.originalname : null;
    let imageId = null;

    const contactType = "2";
    const contactClass = req.body.contactClass

    const contactId = "1";


    const clientAddress = {
      contactId,
      contactClass: contactType,
      streetOne : req.body.streetOne,
      streetTwo : req.body.streetTwo,
      city : req.body.city,
      province : req.body.provinceId,
      country : req.body.countryId,
      postal : req.body.postalCode
    }; 


console.log("address object being constructed", clientAddress)

const client = {
  contactId,
  clientName: req.body.clientName,
  imageId,
}

console.log("client object being built", client);



    if (fileBuffer && fileBuffer.length > 0) {
      console.log("looking for the file buffer length", fileBuffer.length);
  } else {
      console.log("No image file has been uploaded");
  }
// console.log("file description", fileDescription)







    // const fileDescription = req.body.description;
    // const fileBuffer = req.file ? req.file.buffer : null;
    // const originalFileName = req.file ? req.file.originalname : null;
    // let imageId = null;
    // const clientName = req.body.name;


    // // if logo included upload
    // if (fileBuffer) {
    //   const result = await imageUpload(fileDescription, fileBuffer, originalFileName);
    //   imageId = result && result.image ? result.image.id : null;
    // }

    // const contactTypeId = req.body.contactTypeId
    // const clientType = req.body.clientType

    // console.log("here is the clientType: ", clientType)

    // const contactId = await createContact(contactTypeId, clientType)

    // console.log("Contact id test:", contactId)

    // const clientAddress = {
    //   contactId,
    //   contactClass: contactTypeId,
    //   streetOne : req.body.street1,
    //   streetTwo : req.body.street2,
    //   city : req.body.city,
    //   province : req.body.province,
    //   country : req.body.country,
    //   postal : req.body.postal
    // };

    // const client = {
    //   contactId,
    //   clientName,
    //   imageId
    // }

    // const addedClient = await addClient(client);
    
    // const addedAddress = await addAddress(clientAddress);

    // console.log("here is the id from the new address submiuttion", addedAddress)

    // console.log("here is the added producer if return from query: ", addedClient)

    // const dataTest = {
    //   clientName,
    //   streetOne : clientAddress.streetOne,
    //   streetTwo : clientAddress.streetTwo,
    //   cty : clientAddress.city,
    //   province : clientAddress.province,
    //   country : clientAddress.country,
    //   postal : clientAddress.postal,
    //   fileDescription,
    //   imageId
    // }


    // console.log("here are my various input fields, this should be the one with just image info: ", dataTest)


    res.json({ message: 'Test Path successfull.', dataTest });
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;