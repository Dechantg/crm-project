


const db = require('../connection');


const getAllDefaultEntityImage = async () => {
  try {

    const data = await db.query(
      'SELECT * FROM crm_entity_type_default_image;');

    const allDefaultImage = data.rows[0].id;
    
    return allDefaultImage;
  } catch (error) {
    console.error(`Error fetching all default enity image: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = getAllDefaultEntityImage;