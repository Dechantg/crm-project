



const db = require('../connection');

const producerId = () => {
  return db.query(
    `SELECT * FROM crm_producer ORDER BY created_at DESC;`
  )
    .then(data => {
      const producers = data.rows;
      return producers;
    })
    .catch(error => {
      console.error('An error occurred while fetching user Images:', error);
      throw error;
    });
};

module.exports = producerId;