





const db = require('../connection');


const addClientType = async (newClientType) => {
  try {

    const data = await db.query(
      'INSERT INTO crm_client_type (client_type) VALUES ($1) RETURNING id;',
      [newClientType]
    );

    const addedClientType = data.rows[0].id;
    
    console.log("New Client Type created with id ", addedClientType)
    return addedClientType;
  } catch (error) {
    console.error(`Error creating New Contact Class: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addClientType;