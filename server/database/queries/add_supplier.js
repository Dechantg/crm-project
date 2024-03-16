


const db = require('../connection');


const addSupplier = async (supplier) => {
  try {
    const {contactId, SupplierName, imageId} = supplier

    const data = await db.query(
      'INSERT INTO crm_supplier (entity_id, supplier_name, supplier_logo) VALUES ($1, $2, $3) RETURNING id;',
      [contactId, SupplierName, imageId]
    );

    const newSupplier = data.rows[0].id;
    
    console.log("New supplier created with id ", newSupplier)
    return newSupplier;
  } catch (error) {
    console.error(`Error creating supplier: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addSupplier;