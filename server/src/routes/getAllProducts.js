

const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;

const getAllProducts = require('../../database/queries/get_all_products');
const getAllProductImages = require('../../database/queries/get_thumbs_by_id');
const getAllSupplier = require('../../database/queries/get_all_supplier');

const imagesThumbDirectory = path.join(__dirname, process.env.IMAGE_PATH + '/images-thumb');



router.get('/', async (req, res) => {

  try {

    const allProducts = await getAllProducts();
    const allSuppliers = await getAllSupplier();

    const productImages = allProducts.map(product => ({
      image: product.product_image
    }));
    
    const allSupplierObject = {};
    allSuppliers.forEach(result => {
      allSupplierObject[result.id] = result.supplier_name
    })

    allProducts.forEach(product => {
      const supplierName = allSupplierObject[product.supplier_id];
      if (supplierName) {
        product.supplier_name = supplierName;
      }
    });


    const queryResult = await getAllProductImages(productImages);

    const queryResultObject = {};
    queryResult.forEach(result => {
        queryResultObject[result.id] = result.thumbnail;
    });

    allProducts.forEach(product => {
      const thumbnail = queryResultObject[product.product_image];
      if (thumbnail) {
          product.thumbnail = thumbnail;
      }
  });

    if (queryResult && queryResult.length > 0) {
      const thumbnails = queryResult.map(item => item.thumbnail);
      const thumbnailImages = await Promise.all(
        thumbnails.map(async thumbnail => {
          const imagePath = path.join(imagesThumbDirectory, thumbnail);
          const imageBuffer = await fs.readFile(imagePath);
          return { name: thumbnail, data: imageBuffer.toString('base64') };
        })
      );


    console.log("Here are the all products", queryResult);

    res.json({ allProducts, thumbnails: thumbnailImages });

      }

  } catch (error) {
    console.error('Error retrieving all products:', error);
    res.status(500).send('Internal Server Error');
  };
});

module.exports = router;
