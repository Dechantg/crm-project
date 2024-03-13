
const db = require('../connection');


const getAllPhoneType = async () => {
  try {

    const data = await db.query(
      'SELECT * FROM crm_phone_type ORDER BY phone_number_type ASC;'
    );

    const allPhoneType = data.rows;
    
    return allPhoneType;
  } catch (error) {
    console.error(`Error returning phone types: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = getAllPhoneType;