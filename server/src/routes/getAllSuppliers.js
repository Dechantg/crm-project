const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;
const getSupplierEntityId = require('../../database/queries/get_entity_by_class_and_establishment')

const getAllSupplier = require('../../database/queries/get_all_supplier');
const getSupplierLogo = require('../../database/queries/get_producer_logo');

const imagesThumbDirectory = path.join(__dirname, process.env.IMAGE_PATH + '/images-thumb');

router.get('/', async (req, res) => {
  try {

    const entityClass = "3";
    const establishment = true;

    const allSupplierEntityId = await getSupplierEntityId(entityClass, establishment)

    const allSupplier = await getAllSupplier();

    console.log("querey results for all supplier entity id", allSupplierEntityId)

    console.log("query results from the get supplier: ", allSupplier);

    // if (queryResult && queryResult.length > 0) {
    //   const thumbnailImages = await Promise.all(
    //     queryResult.map(async producer => {
    //       if (producer.producer_logo !== null) {
    //         const logoDetails = await getProducerLogo(producer.producer_logo);

    //         console.log("images thumb directory: ", imagesThumbDirectory);
    //         console.log("images thumb file", logoDetails[0].thumbnail);

    //         const imagePath = path.join(imagesThumbDirectory, logoDetails[0].thumbnail);

    //         try {
    //           await fs.access(imagePath);
    //           const imageBuffer = await fs.readFile(imagePath);

    //           return {
    //             id: producer.id,
    //             created_at: producer.created_at,
    //             file_name: producer.file_name,
    //             uuid_file_name: producer.uuid_file_name,
    //             thumbnail: producer.thumbnail,
    //             file_description: producer.file_description,
    //             logo_details: logoDetails,
    //             data: imageBuffer.toString('base64')
    //           };
    //         } catch (error) {
    //           console.error('Error accessing or reading image file:', error);
    //           return null;
    //         }
    //       } else {
    //         // For items with null producer_logo, return without thumbnail data
    //         return {
    //           id: producer.id,
    //           created_at: producer.created_at,
    //           file_name: producer.file_name,
    //           uuid_file_name: producer.uuid_file_name,
    //           thumbnail: producer.thumbnail,
    //           file_description: producer.file_description,
    //           logo_details: null,
    //           data: null
    //         };
    //       }
    //     })
    //   );

      res.json({ allSupplier });
    
  } catch (error) {
    console.error('Error retrieving Images:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
