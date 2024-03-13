





const db = require('../connection');

const getProvince = async (id) => {
  try {
    const data = await db.query(`SELECT * FROM crm_province_state WHERE id = $1;`, [id]);
    const province = data.rows;
    return province;
  } catch (error) {
    console.error(`An error occurred while fetching Province/States with id: ${id}`, error);
    throw error;
  }
};

module.exports = getProvince;