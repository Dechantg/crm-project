


const db = require('../connection');


const addSupplier = async (supplier) => {
  try {

    console.log("from inside the add supplier", supplier)
    const {entityId, entityTypeId, supplierName, imageId} = supplier

    const data = await db.query(
      'INSERT INTO crm_supplier (entity_id, supplier_type, supplier_name, supplier_logo) VALUES ($1, $2, $3, $4) RETURNING id;',
      [entityId, entityTypeId, supplierName, imageId]
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