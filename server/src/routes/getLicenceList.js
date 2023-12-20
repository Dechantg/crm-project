
const express = require('express');
const router = express.Router();

const getLicenceList = require('../../database/queries/get_all_licences')

router.get('/', async (req, res) => {
  try {

    const userId = 1;
   

    const querryResult = await getLicenceList()



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