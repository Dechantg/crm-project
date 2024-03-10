const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;

const getAllProducers = require('../../database/queries/get_all_producers');
const getProducerLogo = require('../../database/queries/get_producer_logo');

const imagesThumbDirectory = path.join(__dirname, process.env.IMAGE_PATH + '/images-thumb');

router.get('/', async (req, res) => {
  try {

    const queryResult = await getAllProducers();

    console.log("query results from the get producers: ", queryResult);

    if (queryResult && queryResult.length > 0) {
      const thumbnailImages = await Promise.all(
        queryResult.map(async producer => {
          if (producer.producer_logo !== null) {
            const logoDetails = await getProducerLogo(producer.producer_logo);

            console.log("images thumb directory: ", imagesThumbDirectory);
            console.log("images thumb file", logoDetails[0].thumbnail);

            const imagePath = path.join(imagesThumbDirectory, logoDetails[0].thumbnail);

            try {
              await fs.access(imagePath);
              const imageBuffer = await fs.readFile(imagePath);

              return {
                id: producer.id,
                created_at: producer.created_at,
                file_name: producer.file_name,
                uuid_file_name: producer.uuid_file_name,
                thumbnail: producer.thumbnail,
                file_description: producer.file_description,
                logo_details: logoDetails,
                data: imageBuffer.toString('base64')
              };
            } catch (error) {
              console.error('Error accessing or reading image file:', error);
              return null;
            }
          } else {
            // For items with null producer_logo, return without thumbnail data
            return {
              id: producer.id,
              created_at: producer.created_at,
              file_name: producer.file_name,
              uuid_file_name: producer.uuid_file_name,
              thumbnail: producer.thumbnail,
              file_description: producer.file_description,
              logo_details: null,
              data: null
            };
          }
        })
      );

      res.json({ producers: thumbnailImages });
    } else {
      res.status(404).json({ error: 'File Record not found' });
    }
  } catch (error) {
    console.error('Error retrieving Images:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
