


const db = require('../connection');


const addClient = async (client) => {
  try {
    const {contactId, clientName, imageId} = client

    const data = await db.query(
      'INSERT INTO crm_client (entity_id, client_name, client_logo) VALUES ($1, $2, $3) RETURNING id;',
      [contactId, clientName, imageId]
    );

    const newClient = data.rows[0].id;
    
    console.log("New contact created with id ", newClient)
    return newClient;
  } catch (error) {
    console.error(`Error creating user: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addClient;