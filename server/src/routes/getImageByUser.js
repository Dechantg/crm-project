

const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;

const getImageByUser = require('../../database/queries/get_images_by_user')

const imagesThumbDirectory = path.join(__dirname, '../../database/images-thumb');


router.get('/', async (req, res) => {
  try {

    const userId = 1;

    const queryResult = await getImageByUser(userId);

   
    if (queryResult && queryResult.length > 0) {
      const thumbnails = queryResult.map(item => item.thumbnail);
      const thumbnailImages = await Promise.all(
        thumbnails.map(async thumbnail => {
          const imagePath = path.join(imagesThumbDirectory, thumbnail);
          const imageBuffer = await fs.readFile(imagePath);
          return { name: thumbnail, data: imageBuffer.toString('base64') };
        })
      );

      res.json({ images: queryResult, thumbnails: thumbnailImages });
    } else {
      res.status(404).json({ error: 'File Record not found' });
    }
  } catch (error) {
    console.error('Error retrieving Images:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;