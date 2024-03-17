




const db = require('../connection');

const getEntityByClassAndEstablishment = async (entityClass, establishment) => {
  try {
    const data = await db.query(`SELECT * FROM crm_entities WHERE entity_class = $1 AND establishment = $2 ORDER BY entity_type ASC;`, [entityClass, establishment]);
    const allEntityResults = data.rows;
    return allEntityResults;
  } catch (error) {
    console.error('An error occurred while fetching All Entity by class and establisment:', error);
    throw error;
  }
};

module.exports = getEntityByClassAndEstablishment;