


const db = require('../connection');

const getAllEntityType = async () => {
  try {
    const data = await db.query(`SELECT * FROM crm_entity_class ORDER BY entity_class_name ASC;`);
    const allEntityType = data.rows;
    return allEntityType;
  } catch (error) {
    console.error('An error occurred while fetching All Entity Type:', error);
    throw error;
  }
};

module.exports = getAllEntityType;