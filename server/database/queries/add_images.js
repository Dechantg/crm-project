

const db = require('../connection');


const addImage = async (userId, fileName, uuidFileName, thumbNail, fileDescription) => {
  try {
    const data = await db.query(
      `INSERT INTO crm_images (id, user_id, file_name, uuid_file_name, thumbnail, file_description) VALUES ('19', $1, $2, $3, $4, $5) RETURNING *;`,
      [userId, fileName, uuidFileName, thumbNail, fileDescription]
    );

    const newImage = data.rows[0];
    
    console.log("new image data from inside the query: ", newImage)
    return { success: true, image: newImage, message: 'Image entry created successfully' };
  } catch (error) {
    console.error(`Error creating user: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addImage;