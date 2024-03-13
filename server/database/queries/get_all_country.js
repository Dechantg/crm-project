



const db = require('../connection');

const getAllCountry = async () => {
  try {
    const data = await db.query(`SELECT * FROM crm_country_code ORDER BY country_name ASC;`);
    const allCountry = data.rows;
    return allCountry;
  } catch (error) {
    console.error('An error occurred while fetching All Countries: ', error);
    throw error;
  }
};

module.exports = getAllCountry;