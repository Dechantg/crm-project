


const db = require('../connection');

const getPdfUser = (userId) => {
  return db.query(
    `SELECT * FROM crm_pdf WHERE user_id = $1 ORDER BY created_at DESC;`, [userId]
  )
    .then(data => {
      const pdf = data.rows;
      return pdf;
    })
    .catch(error => {
      console.error('An error occurred while fetching user PDFs:', error);
      throw error;
    });
};

module.exports = getPdfUser;