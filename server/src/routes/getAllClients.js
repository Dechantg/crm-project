
const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');
const getAllBusinessDetails = require('../../database/queries/get_all_business')
const getAllBusiness = require('../../database/queries/get_entity_establishment')

const imagesThumbDirectory = path.join(__dirname, process.env.IMAGE_PATH + '/images-thumb');


router.get('/', async (req, res) => {
  try {

    const entityClass = "2";
    const establishment = true;

    // console.log("is the get all client route being triggered?")
    
    const allBusiness = await getAllBusiness(establishment)

    console.log("here are all entities with establishment true", )

    console.log("query results for all business enity id", allBusiness)

    const allBusinessDetails = await getAllBusinessDetails(entityClass);

    console.log("query results for all business details", allBusinessDetails)


    // console.log("what about the fileId being valid?", fileId)
    
    // const filePath = path.join(imagesThumbDirectory, `${fileId}`);

    res.json({allBusinessDetails}); 
     
    
  } catch (error) {
    console.error('Error retrieving PDF:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;