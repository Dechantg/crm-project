


const db = require('../connection');

const getImagesUser = (userId) => {
  return db.query(
    `SELECT * FROM crm_images WHERE user_id = $1 ORDER BY created_at DESC;`, [userId]
  )
    .then(data => {
      const images = data.rows;
      return images;
    })
    .catch(error => {
      console.error('An error occurred while fetching user Images:', error);
      throw error;
    });
};

module.exports = getImagesUser;