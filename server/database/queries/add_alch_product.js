



const db = require('../connection');


const addAlchProduct = async (alchProduct) => {
  try {
    const {productId, alchoholPercent, alchType} = alchProduct

    const data = await db.query(
      'INSERT INTO crm_alch_products (product_id, alcohol_percent, alch_class) VALUES ($1, $2, $3) RETURNING id;',
      [productId, alchoholPercent, alchType]
    );

    const newAlchProduct = data.rows[0].id;
    
    console.log("New Alchoholic Product created with id ", newAlchProduct)
    return newAlchProduct;
  } catch (error) {
    console.error(`Error creating user: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addAlchProduct;