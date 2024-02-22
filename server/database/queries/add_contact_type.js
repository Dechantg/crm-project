





const db = require('../connection');


const addContactType = async (newType) => {
  try {

    const data = await db.query(
      'INSERT INTO crm_contact_type (contact_type_name) VALUES ($1) RETURNING id;',
      [newType]
    );

    const newContactType = data.rows[0].id;
    
    console.log("New Contact Type created with id ", newContactType)
    return newContactType;
  } catch (error) {
    console.error(`Error creating New Contact Type: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addContactType;