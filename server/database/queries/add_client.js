


const db = require('../connection');


const addClient = async (client) => {
  try {

    const {entityId, entityTypeId, clientName, imageId} = client

    const data = await db.query(
      'INSERT INTO crm_client (entity_id, client_type, client_name, client_logo) VALUES ($1, $2, $3, $4) RETURNING id;',
      [entityId, entityTypeId, clientName, imageId]
    );

    const newClient = data.rows[0].id;
    
    console.log("New client created with id ", newClient)
    return newClient;
  } catch (error) {
    console.error(`Error creating client: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addClient;