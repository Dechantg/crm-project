





const db = require('../connection');


const addEntityPhone = async (entityPhone) => {
  try {
    const {entityId, phoneNumberType, phoneNumber} = entityPhone

    const data = await db.query(
      'INSERT INTO crm_phone (entity_id, phone_number_type, phone_number) VALUES ($1, $2, $3) RETURNING id;',
      [entityId, phoneNumberType, phoneNumber]
    );

    const newEntityPhone = data.rows[0].id;
    
    console.log("New Entity Name created with id ", newEntityPhone)
    return newEntityPhone;
  } catch (error) {
    console.error(`Error creating phone: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addEntityPhone;