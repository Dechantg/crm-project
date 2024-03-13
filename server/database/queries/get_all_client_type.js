



const db = require('../connection');

const getAllClientType = async () => {
  try {
    const data = await db.query(`SELECT * FROM crm_client_type;`);
    const allClientType = data.rows;
    return allClientType;
  } catch (error) {
    console.error('An error occurred while fetching All Client Types: ', error);
    throw error;
  }
};

module.exports = getAllClientType;