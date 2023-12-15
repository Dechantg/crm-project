



const db = require('../connection');


const addPdf = async (userId, fileName, uuidFileName, thumbNail, fileDescription) => {
  try {
    const data = await db.query(
      'INSERT INTO crm_pdf (user_id, file_name, uuid_file_name, thumbnail, file_description) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
      [userId, fileName, uuidFileName, thumbNail, fileDescription]
    );

    const newPdf = data.rows[0];
    
    console.log("new pdf data from inside the query: ", newPdf)
    return { success: true, pdf: newPdf, message: 'Image entry created successfully' };
  } catch (error) {
    console.error(`Error creating user: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addPdf;