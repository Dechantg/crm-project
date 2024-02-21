


const db = require('../connection');

const getNonAlchClass = async () => {
  try {
    const data = await db.query(`SELECT * FROM crm_non_alch_classes ORDER BY non_alch_type ASC;`);
    const nonAlchClass = data.rows;
    return nonAlchClass;
  } catch (error) {
    console.error('An error occurred while fetching user Images:', error);
    throw error;
  }
};

module.exports = getNonAlchClass;