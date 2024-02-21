
const express =                 require('express');
const configureMulterFile =     require('../helpers/mutlerFile');
const fs =                      require('fs').promises;
const path =                    require('path');
const                           imageUpload = require('../helpers/uploadImageAndThumbnail');
const getAllProducers =         require('../../database/queries/get_all_producers');
const getAllAlch =              require('../../database/queries/get_alch_class')
const getAllNonAlch =           require('../../database/queries/get_all_non_alch_class')

const addProduct =              require('../../database/queries/add_product');
const addAlchProduct =          require('../../database/queries/add_alch_product');


const router = express.Router();

const multerFile = configureMulterFile();


router.get('/', async (req, res) => {
  try {

  const producers = await getAllProducers();
  const allNonAlch = await getAllNonAlch();
  const allAlch = await getAllAlch();
  console.log("here is the producers for verification", producers)
  console.log("here is the alch for verification", allAlch)
  console.log("here is the non-alch for verification", allNonAlch)


  res.render('createproduct', { producers, allAlch, allNonAlch });

} catch (error) {
  console.error('Error retrieving image:', error);
  res.status(500).send('Internal Server Error');
}
});


router.post('/alch', multerFile.single('file'), async (req, res) => {
  try {

    const {producer, productName, alcoholicType, alcoholicPercent, volumeLitresAlch, caseFormatAlch, alchType } = req.body
    const fileDescription = req.body.description;
    const fileBuffer = req.file ? req.file.buffer : null;
    const originalFileName = req.file ? req.file.originalname : null;
    let imageId = null;

    console.log("here is tjhe boday from my alch post", req.body)


    // if logo included upload
    if (fileBuffer) {
      const result = await imageUpload(fileDescription, fileBuffer, originalFileName);
      imageId = result && result.image ? result.image.id : null;
    }

  


    res.json({ message: 'Product page rendered for alch.'});
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});



router.post('/nonalch', multerFile.single('file'), async (req, res) => {
  try {

    const {producer, productName, alcoholicType, volumeLitresNonAlch, caseFormatNonAlch, nonAlchType } = req.body


    console.log("here is tjhe boday from my non alch post", req.body)


    console.log("nonalch route preoducer: ", producer)
    console.log("nonalch route productName: ", productName)
    console.log("nonalch route alcohol type: ", alcoholicType)
    console.log("nonalch route volume liters: ", volumeLitresNonAlch)
    console.log("nonalch route caseformat: ", caseFormatNonAlch)



    const fileDescription = req.body.description;
    const fileBuffer = req.file ? req.file.buffer : null;
    const originalFileName = req.file ? req.file.originalname : null;
    let imageId = null;


    // if logo included upload
    if (fileBuffer) {
      const result = await imageUpload(fileDescription, fileBuffer, originalFileName);
      imageId = result && result.image ? result.image.id : null;
    }



    res.json({ message: 'Product page rendered for nonalch.'});
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;