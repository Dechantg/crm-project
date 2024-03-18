



const db = require('../connection');

const allContacts = async () => {
  try {
    const data = await db.query(`SELECT * FROM crm_contact;`);
    const contacts = data.rows;
    return contacts;
  } catch (error) {
    console.error('An error occurred while fetching user Images:', error);
    throw error;
  }
};

module.exports = allContacts;