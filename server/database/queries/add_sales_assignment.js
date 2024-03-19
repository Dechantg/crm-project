






const db = require('../connection');


const addSalesAssignment = async (supplier) => {
  try {

    const {clientEntityId, salesAgentEntityId, userId} = supplier

    const data = await db.query(
      'INSERT INTO crm_sales_rep_assignment (client_entity_id, sales_entity_agent_id, created_by) VALUES ($1, $2, $3) RETURNING id;',
      [clientEntityId, salesAgentEntityId, userId]
    );

    const newSalesAssignment = data.rows[0].id;
    
    console.log("New Sales Assignment created with id ", newSalesAssignment)
    return newSalesAssignment;
  } catch (error) {
    console.error(`Error creating Sales Assignment: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addSalesAssignment;