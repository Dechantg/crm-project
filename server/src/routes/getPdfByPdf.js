const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');

const pdfSourcePath = path.join(__dirname, '../../database/pdf');

router.get('/:id', async (req, res) => {
  try {

    console.log("is the route being triggered?")

    const fileId = req.params.id;

    console.log("what about the fileId being valid?", fileId)
    
    const filePath = path.join(pdfSourcePath, `${fileId}`);

    if (fs.existsSync(filePath)) {
      const pdfBuffer = fs.readFileSync(filePath);
      console.log("pdf buffer", pdfBuffer)
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename=${fileId}`);
      res.send(pdfBuffer);
      
    } else {
      res.status(404).json({ error: 'PDF not found' });
    }
  } catch (error) {
    console.error('Error retrieving PDF:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;