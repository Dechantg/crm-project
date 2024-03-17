



const db = require('../connection');

const addEntityEmail = async (entityId, entitySocialMedia) => {
  try {
    const placeholders = entitySocialMedia.map((_, index) => `($1, $${index * 2 + 2}, $${index * 2 + 3})`).join(',');

    const values = [entityId, ...entitySocialMedia.flatMap(option => [option.socialType, option.socialmedia])];

    
    

    const data = await db.query(`
      INSERT INTO crm_social_media (entity_id, social_media_type, social_media)
      VALUES ${placeholders}
      RETURNING *;`,
      values
    );

    const insertedOptions = data.rows;
    return insertedOptions;
  } catch (error) {
    console.error('An error occurred while adding Social Media Accounts:', error);
    return error;
  }
};

module.exports = addEntityEmail;

