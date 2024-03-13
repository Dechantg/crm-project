

const db = require('../connection');


const getAllSocialMediaType = async () => {
  try {

    const data = await db.query(
      'SELECT * FROM crm_social_media_type ORDER BY social_media_type ASC;'
    );

    const allSocialMediaType = data.rows;
    
    return allSocialMediaType;
  } catch (error) {
    console.error(`Error returning Social Media Types: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = getAllSocialMediaType;