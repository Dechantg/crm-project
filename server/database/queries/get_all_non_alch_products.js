





const db = require('../connection');

const getAllNonProduct = async () => {
  try {
    const data = await db.query(`SELECT * FROM crm_non_alch_products;`);
    const nonAlchProducts = data.rows;
    return nonAlchProducts;
  } catch (error) {
    console.error('An error occurred while fetching Non Alch Products:', error);
    throw error;
  }
};

module.exports = getAllNonProduct;