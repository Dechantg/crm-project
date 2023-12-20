



const db = require('../connection');

const getLicencee = () => {
  return db.query(
    `SELECT licence_number FROM crm_licence_list;`
    )
    .then(data => {
      const licences = data.rows;
      return licences;
    })
    .catch(error => {
      console.error('An error occurred while fetching user PDFs:', error);
      throw error;
    });
};

module.exports = getLicencee;