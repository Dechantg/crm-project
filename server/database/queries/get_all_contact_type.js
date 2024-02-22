


const db = require('../connection');

const getAllContactType = async () => {
  try {
    const data = await db.query(`SELECT * FROM crm_contact_type ORDER BY contact_type_name ASC;`);
    const allContactType = data.rows;
    return allContactType;
  } catch (error) {
    console.error('An error occurred while fetching All Contact Type:', error);
    throw error;
  }
};

module.exports = getAllContactType;