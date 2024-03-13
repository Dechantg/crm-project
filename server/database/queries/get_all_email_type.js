

const db = require('../connection');


const getAllEmailType = async () => {
  try {

    const data = await db.query(
      'SELECT * FROM crm_email_type ORDER BY email_type ASC;'
    );

    const allEmailTypes = data.rows;
    
    return allEmailTypes;
  } catch (error) {
    console.error(`Error returning Email Types: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = getAllEmailType;