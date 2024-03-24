const getAllEntity = require('../../database/queries/get_all_entity')
const getEntityClass =        require('../../database/queries/get_all_entity_class');
const getEntityType = require('../../database/queries/get_all_entity_type');
const getContactByEntityId = require('../../database/queries/get_contacts_by_entity_id');
const getAllEntityClassRecord = require('../../database/queries/get_all_entity_class_record');





async function buildContactObject () {

  try{

    const establishment = false;
    const allEntity = await getAllEntity(establishment);
    const allEntityClass = await getEntityClass();
    const allEntityType = await getEntityType(establishment);
    const allFetchedContact = await getContactByEntityId(allEntity);
    const allEntityClassRecord = await getAllEntityClassRecord();


    const entityClassRecordMap = allEntityClassRecord.reduce((acc, entityClass) => {
      acc[entityClass.id] = entityClass.entity_class_id;
      return acc;
    }, {});

    const entityTypeMap = allEntityType.reduce((acc, entityType) => {
      acc[entityType.id] = entityType.entity_type_name;
      return acc;
    }, {});

    // console.log("all entity class mapped", entityClassMap);
    console.log("all entity type mapped", entityTypeMap);


    
    const contactMap = allFetchedContact.reduce((acc, contact) => {
      acc[contact.entity_id] = contact;
      return acc;
    }, {});
    
    const contactDetails = allEntity.map(entity => {
console.log("entity debugging line", entity)
      const contact = contactMap[entity.id];

      return {
          ...contact,
          ...entity,
          entity_class_id: entityClassRecordMap[contact.entity_id],
          contact_class_name: entityTypeMap[contact.contact_class],
          contact_id: contact.id,
          honorific: contact.honorific,
      };
    });

    console.log("check all entuity class return", allEntityClass)
    console.log("check all contact details class return", contactDetails)


    
    const allContact = contactDetails.map(contact => {
    const { id, ...filteredContact } = contact;
    return filteredContact;
    });

    return allContact;

  }

  catch (error) {
    console.error('Error converting building Contact Object:', error);
    throw error;
  }
};

module.exports = buildContactObject;