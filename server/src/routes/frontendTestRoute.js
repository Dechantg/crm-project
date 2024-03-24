

const express =               require('express');
const configureMulterFile =   require('../helpers/mutlerFile');
const fs =                    require('fs').promises;
const path =                  require('path');
const imageUpload =           require('../helpers/uploadImageAndThumbnail');
const createContact =         require('../../database/queries/create_entity_record');
const addAddress =            require('../../database/queries/add_address');
const addClient =             require('../../database/queries/add_client');
const getClientType =       require('../../database/queries/get_all_entity_type');
const getContactType =        require('../../database/queries/get_all_entity_class');
const getAllCountry =         require('../../database/queries/get_all_country');
const getAllProvince =        require('../../database/queries/get_all_province');
const getContactClassId =     require('../../database/queries/get_entity_class_id_by_name')
const getAllSocialMediaType = require('../../database/queries/get_all_social_media_type');
const getAllPhoneType =       require('../../database/queries/get_all_phone_type');
const getAllEmailType =       require('../../database/queries/get_all_email_type');
const addPhoneNumbers = require('../../database/queries/add_phone')
const addEmails = require('../../database/queries/add_email')
const addSocialMedia = require('../../database/queries/add_social_media')


const router = express.Router();

const multerFile = configureMulterFile();

const imageUploadPath = path.join(__dirname, process.env.IMAGE_PATH + '/images');
const imageUploadThumbPath = path.join(__dirname, process.env.IMAGE_PATH + '/images-thumb');
const userId = 1





router.post('/test', multerFile.single('image'), async (req, res) => {
  try {

    // console.log(req.file);

    dataTest = req.body
    console.log("from inside the rest route the body", dataTest);

    const fileDescription = req.body.clientName;
    const fileBuffer = req.file ? req.file.buffer : null;
    const originalFileName = req.file ? req.file.originalname : null;
    let imageId = null;








    if (fileBuffer && fileBuffer.length > 0) {
      console.log("looking for the file buffer length", fileBuffer.length);
  } else {
      console.log("No image file has been uploaded");
  }


    res.json({ message: 'Test Path successfull.', dataTest });
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;