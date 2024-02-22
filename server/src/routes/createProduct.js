
const express =                 require('express');
const configureMulterFile =     require('../helpers/mutlerFile');
const fs =                      require('fs').promises;
const path =                    require('path');
const                           imageUpload = require('../helpers/uploadImageAndThumbnail');
const getAllProducers =         require('../../database/queries/get_all_producers');
const getAllAlchClass =              require('../../database/queries/get_alch_class')
const getAllNonAlchClass =           require('../../database/queries/get_all_non_alch_class')

const addProduct =              require('../../database/queries/add_product');
const addAlchProduct =          require('../../database/queries/add_alch_product');
const addNonAlchProduct =       require('../../database/queries/add_non_alch_products')


const router = express.Router();

const multerFile = configureMulterFile();


router.get('/', async (req, res) => {
  try {

  const producers = await getAllProducers();
  const allNonAlch = await getAllNonAlchClass();
  const allAlch = await getAllAlchClass();
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

    const fileDescription = req.body.description;
    const fileBuffer = req.file ? req.file.buffer : null;
    const originalFileName = req.file ? req.file.originalname : null;
    let imageId = null;

    console.log("looking for the poroduct type coming from front", req.body)



    // if logo included upload
    if (fileBuffer) {
      const result = await imageUpload(fileDescription, fileBuffer, originalFileName);
      imageId = result && result.image ? result.image.id : null;
    }

    const newProduct = {
      producerId : req.body.producer,
      productName : req.body.productName,
      imageId : imageId,
      productType : req.body.productType,
      volumeLitres : req.body.volumeLitresAlch,
      caseFormat : req.body.caseFormatAlch
    }

    console.log("here is my new product before query", newProduct);

    const addedProduct = await addProduct(newProduct);

    console.log("here is my new product after adding", addedProduct)

    const newAlchProduct = {
      addedProduct,
      alchoholPercent: req.body.alcoholPercent,
      alchType: req.body.alchType
    };

    console.log("here is me new alch product object before submitting", newAlchProduct);

    const addedAlchProduct = await addAlchProduct(newAlchProduct);


    console.log(" here is the addedAlchProduct after final query", addedAlchProduct)
      


    res.json({ message: 'Product page rendered for alch.'});
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});



router.post('/nonalch', multerFile.single('file'), async (req, res) => {
  try {

    const fileDescription = req.body.description;
    const fileBuffer = req.file ? req.file.buffer : null;
    const originalFileName = req.file ? req.file.originalname : null;
    let imageId = null;

    console.log("looking for the poroduct type coming from front", req.body.productType)



    // if logo included upload
    if (fileBuffer) {
      const result = await imageUpload(fileDescription, fileBuffer, originalFileName);
      imageId = result && result.image ? result.image.id : null;
    }

    const newProduct = {
      producerId : req.body.producer,
      productName : req.body.productName,
      imageId : imageId,
      productType : req.body.productType,
      volumeLitres : req.body.volumeLitresNonAlch,
      caseFormat : req.body.caseFormatNonAlch
    }

    const addedProduct = await addProduct(newProduct);

    const newNonAlchProduct = {
      productId : addedProduct,
      nonAlchType : req.body.nonAlchType
    };

    const addedNonAlchProduct = await addNonAlchProduct(newNonAlchProduct);


    res.json({ message: 'Product page rendered for nonalch.'});
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;