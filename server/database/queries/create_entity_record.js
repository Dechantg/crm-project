





const db = require('../connection');


const addContact = async (entityClass, entityType, establishment) => {
  try {
    const data = await db.query(
      'INSERT INTO crm_entities (entity_class, entity_type, establishment) VALUES ($1, $2, $3) RETURNING id;',
      [entityClass, entityType, establishment]
    );

    const newEntity = data.rows[0].id;
    
    console.log("New entity created with id ", newEntity)
    return newEntity;
  } catch (error) {
    console.error(`Error creating entity: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addContact;