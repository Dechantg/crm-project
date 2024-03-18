


const db = require('../connection');


const addProduct = async (product) => {
  try {
    const {producerId, productName, imageId, productType, volumeLitres, caseFormat} = product

    const data = await db.query(
      'INSERT INTO crm_products (supplier_id, product_name, product_image, product_type, volume_litres, case_format) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;',
      [producerId, productName, imageId, productType, volumeLitres, caseFormat]
    );

    const newProduct = data.rows[0].id;
    
    console.log("New product created with id ", newProduct)
    return newProduct;
  } catch (error) {
    console.error(`Error creating product: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addProduct;