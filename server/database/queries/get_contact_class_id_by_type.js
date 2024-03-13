



const db = require('../connection');

const contactClassIdByType = async (type) => {
  try {
    const data = await db.query(`SELECT * FROM crm_contact_type WHERE contact_type_name = $1;`, [type]);
    const contactClassId = data.rows;
    return contactClassId;
  } catch (error) {
    console.error('An error occurred while fetching Contact Class Id:', error);
    throw error;
  }
};

module.exports = contactClassIdByType;