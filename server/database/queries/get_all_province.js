




const db = require('../connection');

const getAllProvince = async () => {
  try {
    const data = await db.query(`SELECT * FROM crm_province_state ORDER BY province_state_name ASC;`);
    const allCountry = data.rows;
    return allCountry;
  } catch (error) {
    console.error('An error occurred while fetching All Province/States: ', error);
    throw error;
  }
};

module.exports = getAllProvince;