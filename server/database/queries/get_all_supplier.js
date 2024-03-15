


const db = require('../connection');

const producerId = async () => {
  try {
    const data = await db.query(`SELECT * FROM crm_supplier ORDER BY created_at DESC;`);
    const producers = data.rows;
    return producers;
  } catch (error) {
    console.error('An error occurred while fetching user Images:', error);
    throw error;
  }
};

module.exports = producerId;