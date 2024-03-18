
const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');

const getAllContact = require('../../database/queries/get_all_contact');
const getAllEntity = require ('../../database/queries/get_all_entity');
const getAllEntityClass = require('../../database/queries/get_all_entity_class');



router.get('/', async (req, res) => {
  try {

    const establishment = false;
    const allFetchedContact = await getAllContact();
    const allEntity = await getAllEntity(establishment);
    const allEntityClass = await getAllEntityClass();
 

    const entityClassMap = allEntityClass.reduce((acc, entityClass) => {
      acc[entityClass.id] = entityClass.entity_class_name;
      return acc;
  }, {});
  
  const contactMap = allFetchedContact.reduce((acc, contact) => {
      acc[contact.entity_id] = contact;
      return acc;
  }, {});
  
  const contactDetails = allEntity.map(entity => {
      const contact = contactMap[entity.id];
      return {
          ...contact,
          ...entity,
          entity_class_name: entityClassMap[entity.entity_class],
          contact_id: contact.id
      };
  });

  const allContact = contactDetails.map(contact => {
    const { id, ...filteredContact } = contact;
    return filteredContact;
});
  

  console.log(allContact);
  
    res.json({allContact})


  } catch (error) {
    console.error('Error retrieving PDF:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;