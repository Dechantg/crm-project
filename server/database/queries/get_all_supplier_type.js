



const db = require('../connection');

const getAllSupplierType = async () => {
  try {
    const data = await db.query(`SELECT * FROM crm_Supplier_type;`);
    const allSupplierType = data.rows;
    return allSupplierType;
  } catch (error) {
    console.error('An error occurred while fetching All Supplier Types: ', error);
    throw error;
  }
};

module.exports = getAllSupplierType;