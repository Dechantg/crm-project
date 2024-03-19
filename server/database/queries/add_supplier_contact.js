


const db = require('../connection');


const addSupplierContact = async (supplier) => {
  try {

    const {supplierEntityId, contactEntityId, userId} = supplier

    const data = await db.query(
      'INSERT INTO crm_supplier_contact (supplier_entity_id, contact_entity_id, created_by) VALUES ($1, $2, $3) RETURNING id;',
      [supplierEntityId, contactEntityId, userId]
    );

    const newSupplierContact = data.rows[0].id;
    
    console.log("New Supplier Contact created with id ", newSupplierContact)
    return newSupplierContact;
  } catch (error) {
    console.error(`Error creating Supplier Contact: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addSupplierContact;