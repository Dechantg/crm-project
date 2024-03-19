const getAllEntity = require('../../database/queries/get_all_entity')
const getEntityType =        require('../../database/queries/get_all_entity_class');
const getContactByEntityId = require('../../database/queries/get_contacts_by_entity_id')





async function buildContactObject () {

  try{

    const establishment = false;
    const allEntity = await getAllEntity(establishment);
    const allEntityClass = await getEntityType();
    const allFetchedContact = await getContactByEntityId(allEntity);


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
          contact_id: contact.id,
          honorific: contact.honorific,
      };
    });
    
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