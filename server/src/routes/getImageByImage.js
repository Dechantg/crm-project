const express = require('express');
const path = require('path');
const fs = require('fs');
const imageSize = require('image-size');

const router = express.Router();
const imageSourcePath = path.join(__dirname, process.env.IMAGE_PATH + '/images');

router.get('/:id', async (req, res) => {
  try {
    console.log("Is the route being triggered?");

    const fileId = req.params.id;

    console.log("Is the fileId valid?", fileId);

    const filePath = path.join(imageSourcePath, `${fileId}`);

    if (fs.existsSync(filePath)) {
      const imageBuffer = fs.readFileSync(filePath);

      // Use image-size to get image dimensions
      const dimensions = imageSize(imageBuffer);

      if (dimensions) {
        const contentType = `image/${dimensions.type}`;

        console.log("Image buffer", imageBuffer);

        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `inline; filename=${fileId}`);
        res.send(imageBuffer);
      } else {
        res.status(500).json({ error: 'Unable to detect image type' });
      }
    } else {
      res.status(404).json({ error: 'Image not found' });
    }
  } catch (error) {
    console.error('Error retrieving image:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;