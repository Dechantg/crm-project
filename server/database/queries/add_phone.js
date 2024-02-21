





const db = require('../connection');


const addContactPhone = async (contactPhone) => {
  try {
    const {contactId, phoneNumberType, phoneNumber} = contactPhone

    const data = await db.query(
      'INSERT INTO crm_phone (contact_id, phone_number_type, phone_number) VALUES ($1, $2, $3) RETURNING id;',
      [contactId, phoneNumberType, phoneNumber]
    );

    const newContactPhone = data.rows[0].id;
    
    console.log("New Contact Name created with id ", newContactPhone)
    return newContactPhone;
  } catch (error) {
    console.error(`Error creating user: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addContactPhone;