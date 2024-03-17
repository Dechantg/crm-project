



const db = require('../connection');

const entityClassIdByName = async (className) => {
  try {
    const data = await db.query(`SELECT * FROM crm_entity_class WHERE entity_class_name = $1;`, [className]);
    const entityClassId = data.rows;
    return entityClassId;
  } catch (error) {
    console.error('An error occurred while fetching Contact Class Id:', error);
    throw error;
  }
};

module.exports = entityClassIdByName;