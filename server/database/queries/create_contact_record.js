





const db = require('../connection');


const addContact = async (contactClass, contactType) => {
  try {
    const data = await db.query(
      'INSERT INTO crm_contacts (contact_type, contact_class) VALUES ($1, $2) RETURNING id;',
      [contactType, contactClass]
    );

    const newContact = data.rows[0].id;
    
    console.log("New contact created with id ", newContact)
    return newContact;
  } catch (error) {
    console.error(`Error creating contact: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addContact;