
const express = require('express');
const router = express.Router();



const contactObjectBuilder = require('../helpers/contactObjectBuilder')



router.get('/', async (req, res) => {
  try {

    const establishment = false;



const allContact = await contactObjectBuilder(establishment);
  

  // console.log(allContact);
  
    res.json({allContact})


  } catch (error) {
    console.error('Error retrieving Contacts:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;