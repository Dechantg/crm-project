



const db = require('../connection');

const getAllEntityType = async (establishment) => {
  try {
    const data = await db.query(`SELECT * FROM crm_entity_type WHERE establishment = $1;`, [establishment]);
    const allBusinessType = data.rows;
    return allBusinessType;
  } catch (error) {
    console.error('An error occurred while fetching All Business Types: ', error);
    throw error;
  }
};

module.exports = getAllEntityType;