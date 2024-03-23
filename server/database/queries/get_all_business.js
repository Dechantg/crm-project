


const db = require('../connection');

const businessId = async () => {
  try {
    const data = await db.query(`SELECT * FROM crm_business;`);
    const clients = data.rows;
    return clients;
  } catch (error) {
    console.error('An error occurred while fetching user Images:', error);
    throw error;
  }
};

module.exports = businessId;