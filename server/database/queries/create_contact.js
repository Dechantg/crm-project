





const db = require('../connection');


const addContact = async (contactClass) => {
  try {
    const data = await db.query(
      'INSERT INTO crm_contacts (contact_classification) VALUES ($1) RETURNING id;',
      [contactClass]
    );

    const newContact = data.rows[0].id;
    
    console.log("New contact created with id ", newContact)
    return newContact;
  } catch (error) {
    console.error(`Error creating user: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addContact;