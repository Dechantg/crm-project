





const db = require('../connection');

const getCountry = async (id) => {
  try {
    const data = await db.query(`SELECT * FROM crm_country_code WHERE id = $1;`, [id]);
    const country = data.rows;
    return country;
  } catch (error) {
    console.error(`An error occurred while fetching country with id: ${id}`, error);
    throw error;
  }
};

module.exports = getCountry;