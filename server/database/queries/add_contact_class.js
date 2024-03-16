





const db = require('../connection');


const addContactClass = async (newClass) => {
  try {
    const {entityClass, contactType} = newClass

    const data = await db.query(
      'INSERT INTO crm_contact_class (entity_class, contact_type) VALUES ($1, $2) RETURNING id;',
      [entityClass, contactType]
    );

    const newContactClass = data.rows[0].id;
    
    console.log("New Contact Class created with id ", newContactClass)
    return newContactClass;
  } catch (error) {
    console.error(`Error creating New Contact Class: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addContactClass;