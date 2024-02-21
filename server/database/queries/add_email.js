






const db = require('../connection');


const addContactEmail = async (contactEmail) => {
  try {
    const {contactId, phoneEmailType, phoneEmail} = contactEmail

    const data = await db.query(
      'INSERT INTO crm_phone (contact_id, email_type, email) VALUES ($1, $2, $3) RETURNING id;',
      [contactId, phoneEmailType, phoneEmail]
    );

    const newContactEmail = data.rows[0].id;
    
    console.log("New Contact Name created with id ", newContactEmail)
    return newContactEmail;
  } catch (error) {
    console.error(`Error creating user: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addContactEmail;