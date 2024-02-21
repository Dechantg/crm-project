


const db = require('../connection');

const getAllContactClass = async () => {
  try {
    const data = await db.query(`SELECT * FROM crm_contact_class ORDER BY contact_class ASC;`);
    const contactClass = data.rows;
    return contactClass;
  } catch (error) {
    console.error('An error occurred while fetching user Images:', error);
    throw error;
  }
};

module.exports = getAllContactClass;