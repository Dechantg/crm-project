



const db = require('../connection');

const getAllEntityType = async () => {
  try {
    const data = await db.query(`SELECT * FROM crm_entity_class_record`);
    const allEntityClassRecord = data.rows;
    return allEntityClassRecord;
  } catch (error) {
    console.error('An error occurred while fetching All Entity Class Records: ', error);
    throw error;
  }
};

module.exports = getAllEntityType;