const express = require('express');
const uploadMemory = require('../helpers/multerMemory');
const excelToJsonConvertion = require('../helpers/excelToJsonConvertion');
const updateList = require('../../database/queries/add_licencee_list')
const getList = require('../../database/queries/get_all_licences')

const router = express.Router();

router.post('/', uploadMemory.single('file'), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const userId = 1;

    console.log('req.file:', req.file);



    const jsonData = await excelToJsonConvertion(fileBuffer);

    const mappedData = jsonData.map(row => ({
      user_id: userId,
      active: true,
      licence_number: row['Licence Number'],
      licence_type: row['Licence Type'],
      establishment: row['Establishment'],
      establishment_address_street: row['Establishment Address Street'],
      establishment_address_city: row['Establishment Address City'],
      establishment_address_postal_code: row['Establishment Address Postal Code'],
      licensee: row['Licensee'],
      licence_sub_category_id: row['Licence Sub Category Id'],
      third_party_operator: row['Third Party Operator']
    }));

    const licenceList = await getList();

    const removedObjects = [];

    const updatedList = mappedData.filter(data => {
      const matchIndex = licenceList.findIndex(licence => licence.licence_number === data.licence_number);

      if (matchIndex !== -1) {
        removedObjects.push(licenceList[matchIndex]);
        return false; 
      }

      return true;
    });

    if (updatedList.length === 0) {
      return res.json({ message: 'No new items to add.' });
    }


    console.log('Removed Objects:', removedObjects);


    const updatedLicenceList = await updateList(updatedList);



    res.json({ updatedLicenceList });
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;