





const db = require('../connection');


const addContact = async (contactClass) => {
  try {
    const data = await db.query(
      'INSERT INTO crm_contacts (contact_classification) VALUES ($1) RETURNING id;',
      [contactClass]
    );

    const newContact = data.rows[0];
    
    console.log("New contact created with id ", newContact)
    return { success: true, contact: newContact, message: 'Contact entry created successfully' };
  } catch (error) {
    console.error(`Error creating user: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addContact;