





const db = require('../connection');


const addContactName = async (contactName) => {
  try {
    const {entityId, contactClass, firstName, lastName, honorific} = contactName

    const data = await db.query(
      'INSERT INTO crm_contact (entity_id, contact_class, first_name, last_name, honorific) VALUES ($1, $2, $3, $4, $5) RETURNING id;',
      [entityId, contactClass, firstName, lastName, honorific]
    );

    const newContactName = data.rows[0].id;
    
    console.log("New Contact Name created with id ", newContactName)
    return newContactName;
  } catch (error) {
    console.error(`Error creating contact name: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addContactName;