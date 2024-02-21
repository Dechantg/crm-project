



const db = require('../connection');


const addNonProduct = async (alchNonProduct) => {
  try {
    const {productId} = alchNonProduct

    const data = await db.query(
      'INSERT INTO crm_non_alch_products (product_id) VALUES ($1) RETURNING id;',
      [productId]
    );

    const newNonAlchProduct = data.rows[0].id;
    
    console.log("New Alchoholic Product created with id ", newNonAlchProduct)
    return newNonAlchProduct;
  } catch (error) {
    console.error(`Error creating user: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addNonProduct;