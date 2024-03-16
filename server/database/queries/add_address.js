



const db = require('../connection');


const addAddress = async (addressDetails) => {
  try {

     const {enityId, establishment, entityClass, streetOne, streetTwo, city, province, country, postal} = addressDetails




    const data = await db.query(
      'INSERT INTO crm_address (entity_id, establishment, address_classification, street_address_one, street_address_two, address_city, address_province, address_country, address_postal_code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id;',
      [enityId, establishment, entityClass, streetOne, streetTwo, city, province, country, postal]
    );

    const newAddress = data.rows[0].id;
    
    console.log("New address record created with id ", newAddress)
    return newAddress;
  } catch (error) {
    console.error(`Error creating address record: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addAddress;