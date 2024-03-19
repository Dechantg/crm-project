




const db = require('../connection');


const addClientContact = async (clientContact) => {
  try {

    const {clientId, contactEntityId, userId} = clientContact

    const data = await db.query(
      'INSERT INTO crm_client_contact (client_id, contact_entity_id, created_by) VALUES ($1, $2, $3) RETURNING id;',
      [clientId, contactEntityId, userId]
    );

    const newClientContact = data.rows[0].id;
    
    console.log("New Supplier Contact created with id ", newClientContact)
    return newClientContact;
  } catch (error) {
    console.error(`Error creating Client Contact: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addClientContact;