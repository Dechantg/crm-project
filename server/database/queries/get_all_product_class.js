



const db = require('../connection');

const getProductClass = async () => {
  try {
    const data = await db.query(`SELECT * FROM crm_product_class;`);
    const productClass = data.rows;
    return productClass;
  } catch (error) {
    console.error('An error occurred while fetching Product Class:', error);
    throw error;
  }
};

module.exports = getProductClass;