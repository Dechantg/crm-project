
const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');
const getAllClient = require('../../database/queries/get_all_clients')

const imagesThumbDirectory = path.join(__dirname, process.env.IMAGE_PATH + '/images-thumb');


router.get('/', async (req, res) => {
  try {

    // console.log("is the get all client route being triggered?")

    const allClients = await getAllClient();


    // console.log("what about the fileId being valid?", fileId)
    
    // const filePath = path.join(imagesThumbDirectory, `${fileId}`);

    res.json({allClients}); 
     
    
  } catch (error) {
    console.error('Error retrieving PDF:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;