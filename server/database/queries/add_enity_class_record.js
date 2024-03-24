




const db = require('../connection');

const addEntityClassRecord = async (entityId, entityClass) => {
  try {
    const placeholders = entityPhone.map((_, index) => `($1, $${index * 2 + 2}, $${index * 2 + 3})`).join(',');

    const values = [entityId, ...entityPhone.flatMap(option => [option.phoneType, option.phoneNumber])];
    

    const data = await db.query(`
      INSERT INTO crm_entity_class_record (entity_id, phone_number_type, phone_number)
      VALUES ${placeholders}
      RETURNING *;`,
      values
    );

    const insertedOptions = data.rows;
    return insertedOptions;
  } catch (error) {
    console.error('An error occurred while adding Entity Class Record:', error);
    return error;
  }
};

module.exports = addEntityClassRecord;
