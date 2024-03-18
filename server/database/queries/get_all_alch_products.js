





const db = require('../connection');

const getAllAlchProduct = async () => {
  try {
    const data = await db.query(`SELECT * FROM crm_alch_products;`);
    const alchProducts = data.rows;
    return alchProducts;
  } catch (error) {
    console.error('An error occurred while fetching Alch Products:', error);
    throw error;
  }
};

module.exports = getAllAlchProduct;