

const express = require('express');
const router = express.Router();

const getDocumentsByUser = require('../../database/queries/get_document_by_user')

router.get('/', async (req, res) => {
  try {

    const userId = 1;
   

    const querryResult = await getDocumentsByUser(userId)



    if (querryResult) {
      res.json({ querryResult });
    } else {
      res.status(404).json({ error: 'File Record not found' });
    }
  } catch (error) {
    console.error('Error retrieving documents:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;