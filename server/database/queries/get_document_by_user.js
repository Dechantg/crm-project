


const db = require('../connection');

const getDocumentsByUser = (userId) => {
  return db.query(
    `SELECT * FROM crm_document WHERE user_id = $1 ORDER BY created_at DESC;`, [userId]
  )
    .then(data => {
      const results = data.rows;
      return results;
    })
    .catch(error => {
      console.error('An error occurred while fetching user Documets:', error);
      throw error;
    });
};

module.exports = getDocumentsByUser;