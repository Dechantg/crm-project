


const db = require('../connection');

const getAllContactClass = async () => {
  try {
    const data = await db.query(`SELECT * FROM crm_contact_class ORDER BY contact_type ASC;`);
    const allContactClass = data.rows;
    return allContactClass;
  } catch (error) {
    console.error('An error occurred while fetching All Contact Class:', error);
    throw error;
  }
};

module.exports = getAllContactClass;