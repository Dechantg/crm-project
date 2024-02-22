





const db = require('../connection');


const addContactName = async (contactName) => {
  try {
    const {contactId, firstName, lastName, honorific} = contactName

    const data = await db.query(
      'INSERT INTO crm_contact_name (contact_id, first_name, last_name, honorific) VALUES ($1, $2, $3, $4) RETURNING id;',
      [contactId, firstName, lastName, honorific]
    );

    const newContactName = data.rows[0].id;
    
    console.log("New Contact Name created with id ", newContactName)
    return newContactName;
  } catch (error) {
    console.error(`Error creating user: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addContactName;