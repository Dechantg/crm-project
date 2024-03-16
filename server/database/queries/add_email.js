






const db = require('../connection');


const addContactEmail = async (contactEmail) => {
  try {
    const {entityId, phoneEmailType, phoneEmail} = contactEmail

    const data = await db.query(
      'INSERT INTO crm_phone (entity_id, email_type, email) VALUES ($1, $2, $3) RETURNING id;',
      [entityId, phoneEmailType, phoneEmail]
    );

    const newContactEmail = data.rows[0].id;
    
    console.log("New Entity Phone created with id ", newContactEmail)
    return newContactEmail;
  } catch (error) {
    console.error(`Error creating email: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addContactEmail;