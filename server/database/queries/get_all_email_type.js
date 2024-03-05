






const db = require('../connection');


const getAllEmailType = async () => {
  try {

    const data = await db.query(
      'SELECT * FROM crm_email_types ORDER BY email_type ASC;'
    );

    const allEmailTypes = data.rows;
    
    console.log("All Email Types Returned ", allEmailTypes)
    return allEmailTypes;
  } catch (error) {
    console.error(`Error returning Email Types: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = getAllEmailType;