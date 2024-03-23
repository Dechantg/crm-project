const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;
const getSupplierEntityId = require('../../database/queries/get_entity_establishment')

const getAllSupplier = require('../../database/queries/get_all_supplier');
const getBusinessLogo = require('../../database/queries/get_thumbs_by_id');

const getAllBusinessDetails = require('../../database/queries/get_all_business')
// const getAllBusiness = require('../../database/queries/get_entity_establishment')
const getAllEntityClass = require('../../database/queries/get_all_entity_class');

const imagesThumbDirectory = path.join(__dirname, process.env.IMAGE_PATH + '/images-thumb');

router.get('/', async (req, res) => {
  try {

    // const entityClass = "3";
    // const establishment = true;

    // const allBusinessEntityId = await getAllBusiness(establishment);

    const allEntityClass = await getAllEntityClass();

    const allBusiness = await getAllBusinessDetails();

    const businessImages = allBusiness.map(business => ({
      image: business.business_logo
    }));


    const businessImageResult = await getBusinessLogo(businessImages);


   

    const businessImageResultObject = {};
    businessImageResult.forEach(result => {
      businessImageResultObject[result.id] = result.thumbnail;
    });

    allBusiness.forEach(supplier => {
      const thumbnail = businessImageResultObject[supplier.business_logo];
      if (thumbnail) {
          supplier.thumbnail = thumbnail;
      }
  });

// console.log("the mapping of query resulkt", allBusiness);

    if (businessImageResult && businessImageResult.length > 0) {
      const thumbnails = businessImageResult.map(item => item.thumbnail);
      const thumbnailImages = await Promise.all(
        thumbnails.map(async thumbnail => {
          const imagePath = path.join(imagesThumbDirectory, thumbnail);
          const imageBuffer = await fs.readFile(imagePath);
          return { name: thumbnail, data: imageBuffer.toString('base64') };
        })
      );


      res.json({ allBusiness, thumbnails: thumbnailImages, allEntityClass  });


      }



    // console.log("Here are the all products", supplierImages);


    
  } catch (error) {
    console.error('Error retrieving Images:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
