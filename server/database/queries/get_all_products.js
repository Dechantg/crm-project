



const db = require('../connection');

const getAllProduct = async () => {
  try {
    const data = await db.query(`SELECT * FROM crm_products;`);
    const products = data.rows;
    return products;
  } catch (error) {
    console.error('An error occurred while fetching Products:', error);
    throw error;
  }
};

module.exports = getAllProduct;