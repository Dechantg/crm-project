
const db = require('../connection');

const getContactByEntityId = async (entityIds) => {
  try {
    const ids = entityIds.map(contact => contact.id);

    console.log("from inside the contact entity query pre query", ids)


    const queryString = `
    SELECT *
    FROM crm_contact 
    WHERE entity_id IN (${ids.map((_, index) => `$${index + 1}`).join(',')});
  `;

  const data = await db.query(queryString, ids);
  const contact = data.rows;
  return contact;


  } catch (error) {
    console.error('An error occurred while fetching Contacts by Entity Id: ', error);
    throw error;
  }
};

module.exports = getContactByEntityId;