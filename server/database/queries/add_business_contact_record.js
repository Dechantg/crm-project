






const db = require('../connection');

const addBusinessContactRecord = async (businessEntityId, userId, contactRecord) => {
  try {
    const placeholders = contactRecord.map((_, index) => `($1, $2, $${index * 2 + 3}, $${index * 2 + 4})`).join(',');

    const values = [businessEntityId, userId,...contactRecord.flatMap(option => [option.contactEntityId, option.contactNote])];
    

    const data = await db.query(`
      INSERT INTO crm_business_contact_record (business_entity_id, created_by, contact_entity_id, contact_notes)
      VALUES ${placeholders}
      RETURNING *;`,
      values
    );

    const businessContactRecord = data.rows;
    return businessContactRecord;
  } catch (error) {
    console.error('An error occurred while adding Business Contact Record:', error);
    return error;
  }
};

module.exports = addBusinessContactRecord;

