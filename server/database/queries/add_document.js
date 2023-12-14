



const db = require('../connection');


const addDocument = async (userId, fileName, uuidFileName, fileDescription) => {
  try {
    const data = await db.query(
      'INSERT INTO crm_document (user_id, file_name, uuid_file_name, file_description) VALUES ($1, $2, $3, $4) RETURNING *;',
      [userId, fileName, uuidFileName, fileDescription]
    );

    const newDocument = data.rows[0];
    
    console.log("new document data from inside the query: ", newDocument)
    return { success: true, document: newDocument, message: 'Document entry created successfully' };
  } catch (error) {
    console.error(`Error creating user: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addDocument;