const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;
const getSupplierEntityId = require('../../database/queries/get_entity_by_class_and_establishment')

const getAllSupplier = require('../../database/queries/get_all_supplier');
const getSupplierLogo = require('../../database/queries/get_thumbs_by_id');


const imagesThumbDirectory = path.join(__dirname, process.env.IMAGE_PATH + '/images-thumb');

router.get('/', async (req, res) => {
  try {

    const entityClass = "3";
    const establishment = true;

    const allSupplierEntityId = await getSupplierEntityId(entityClass, establishment)

    const allSupplier = await getAllSupplier();

    const supplierImages = allSupplier.map(supplier => ({
      image: supplier.supplier_logo
    }));

    const queryResult = await getSupplierLogo(supplierImages);


   

    const queryResultObject = {};
    queryResult.forEach(result => {
        queryResultObject[result.id] = result.thumbnail;
    });

    allSupplier.forEach(supplier => {
      const thumbnail = queryResultObject[supplier.supplier_logo];
      if (thumbnail) {
          supplier.thumbnail = thumbnail;
      }
  });

console.log("the mapping of query resulkt", allSupplier);

    if (queryResult && queryResult.length > 0) {
      const thumbnails = queryResult.map(item => item.thumbnail);
      const thumbnailImages = await Promise.all(
        thumbnails.map(async thumbnail => {
          const imagePath = path.join(imagesThumbDirectory, thumbnail);
          const imageBuffer = await fs.readFile(imagePath);
          return { name: thumbnail, data: imageBuffer.toString('base64') };
        })
      );

      res.json({ allSupplier, thumbnails: thumbnailImages  });


      }



    // console.log("Here are the all products", supplierImages);


    
  } catch (error) {
    console.error('Error retrieving Images:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
