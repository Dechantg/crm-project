



const db = require('../connection');


const addProduct = async (alchProduct) => {
  try {
    const {productId, alchoholPercent} = alchProduct

    const data = await db.query(
      'INSERT INTO crm_alch_products (product_id, alcohol_percent) VALUES ($1, $2) RETURNING id;',
      [productId, alchoholPercent]
    );

    const newAlchProduct = data.rows[0].id;
    
    console.log("New Alchoholic Product created with id ", newAlchProduct)
    return newProduct;
  } catch (error) {
    console.error(`Error creating user: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addProduct;