
const db = require('../connection');

const getThumbsById = async (imageIds) => {
  try {
    const ids = imageIds.map(image => image.image);


    const queryString = `
    SELECT id, thumbnail
    FROM crm_images 
    WHERE id IN (${ids.map((_, index) => `$${index + 1}`).join(',')});
  `;

  const data = await db.query(queryString, ids);
  const imageThumbs = data.rows;
  return imageThumbs;


  } catch (error) {
    console.error('An error occurred while fetching All Supplier Types: ', error);
    throw error;
  }
};

module.exports = getThumbsById;