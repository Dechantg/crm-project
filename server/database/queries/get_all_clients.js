


const db = require('../connection');

const clientId = async () => {
  try {
    const data = await db.query(`SELECT * FROM crm_client ORDER BY created_at DESC;`);
    const clients = data.rows;
    return clients;
  } catch (error) {
    console.error('An error occurred while fetching user Images:', error);
    throw error;
  }
};

module.exports = clientId;