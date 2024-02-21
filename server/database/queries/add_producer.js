


const db = require('../connection');


const addProducer = async (producer) => {
  try {
    const {contactId, producerName, imageId} = producer

    const data = await db.query(
      'INSERT INTO crm_producer (contact_id, producer_name, producer_logo) VALUES ($1, $2, $3) RETURNING id;',
      [contactId, producerName, imageId]
    );

    const newProducer = data.rows[0].id;
    
    console.log("New contact created with id ", newProducer)
    return newProducer;
  } catch (error) {
    console.error(`Error creating user: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addProducer;