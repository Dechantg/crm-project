

const db = require('../connection');

const allEntity = async (establisment) => {
  try {
    const data = await db.query('SELECT * FROM crm_entities WHERE establishment = $1', [establisment]);
    const entities = data.rows;
    return entities;
  } catch (error) {
    console.error('An error occurred while fetching user Images:', error);
    throw error;
  }
};

module.exports = allEntity;
