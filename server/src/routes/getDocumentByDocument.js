const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');
const handleFile = require('../helpers/handleFile');

const documentSourcePath = path.join(__dirname, process.env.IMAGE_PATH + '/documents');

router.get('/:id', async (req, res) => {
  try {
    const fileId = req.params.id;
    console.log("is the route being triggered?");
    console.log("what about the fileId being valid?", fileId);

    const filePath = path.join(documentSourcePath, `${fileId}`);

    console.log("the fileId being used", fileId);

    if (fs.existsSync(filePath)) {
      const documentBuffer = fs.readFileSync(filePath);

      const fileExtension = path.extname(fileId).toLowerCase().slice(1);

      console.log("the file extension extracted", fileExtension);

      const result = await handleFile(documentBuffer, fileExtension);

      res.json(result);
    } else {
      res.status(404).json({ error: 'Document not found' });
    }
  } catch (error) {
    console.error('Error retrieving document:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;