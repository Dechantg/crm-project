


const db = require('../connection');

const getAlchClass = async () => {
  try {
    const data = await db.query(`SELECT * FROM crm_alch_classes ORDER BY alch_type ASC;`);
    const alchClass = data.rows;
    return alchClass;
  } catch (error) {
    console.error('An error occurred while fetching user Images:', error);
    throw error;
  }
};

module.exports = getAlchClass;