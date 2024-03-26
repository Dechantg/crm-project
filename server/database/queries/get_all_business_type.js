



const db = require('../connection');

const getAllBusinessType = async () => {
  try {
    const data = await db.query(`SELECT * FROM crm_business_type;`);
    const allBusinessType = data.rows;
    return allBusinessType;
  } catch (error) {
    console.error('An error occurred while fetching All Business Types: ', error);
    throw error;
  }
};

module.exports = getAllBusinessType;