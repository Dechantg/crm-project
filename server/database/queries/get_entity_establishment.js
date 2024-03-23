




const db = require('../connection');

const getEntityByEstablishment = async (establishment) => {
  try {
    const data = await db.query(`SELECT * FROM crm_entities WHERE establishment = $1;`, [establishment]);
    const allEntityResults = data.rows;
    return allEntityResults;
  } catch (error) {
    console.error('An error occurred while fetching All Entity by class and establisment:', error);
    throw error;
  }
};

module.exports = getEntityByEstablishment;