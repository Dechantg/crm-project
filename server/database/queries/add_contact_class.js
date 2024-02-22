





const db = require('../connection');


const addContactClass = async (newClass) => {
  try {
    const {contactClass, contactType} = newClass

    const data = await db.query(
      'INSERT INTO crm_contact_class (contact_class, contact_type) VALUES ($1, $2) RETURNING id;',
      [contactClass, contactType]
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