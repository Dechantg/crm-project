


const db = require('../connection');

const addEntityEmail = async (entityId, entityEmail) => {
  try {
    const placeholders = entityEmail.map((_, index) => `($1, $${index * 2 + 2}, $${index * 2 + 3})`).join(',');

    const values = [entityId, ...entityEmail.flatMap(option => [option.emailType, option.email])];
    

    const data = await db.query(`
      INSERT INTO crm_email (entity_id, email_type, email)
      VALUES ${placeholders}
      RETURNING *;`,
      values
    );

    const insertedOptions = data.rows;
    return insertedOptions;
  } catch (error) {
    console.error('An error occurred while adding Emails:', error);
    return error;
  }
};

module.exports = addEntityEmail;

