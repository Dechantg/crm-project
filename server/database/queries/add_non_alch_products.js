



const db = require('../connection');


const addNonProduct = async (alchNonProduct) => {
  try {
    const {productId, nonAlchType} = alchNonProduct

    const data = await db.query(
      'INSERT INTO crm_non_alch_products (product_id, non_alch_class) VALUES ($1, $2) RETURNING id;',
      [productId, nonAlchType]
    );

    const newNonAlchProduct = data.rows[0].id;
    
    console.log("New Non Alchoholic Product created with id ", newNonAlchProduct)
    return newNonAlchProduct;
  } catch (error) {
    console.error(`Error creating user: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addNonProduct;