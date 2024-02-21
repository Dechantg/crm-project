

const db = require('../connection');

const getProducerLogo = async (logoId) => {
  try {
    const { rows: images } = await db.query(
      `SELECT * FROM crm_images WHERE id = $1;`, [logoId]
    );

    console.log("from inside the logo query here is the image", images)

    return images;
  } catch (error) {
    console.error('An error occurred while fetching user Images:', error);
    throw error;
  }
};

module.exports = getProducerLogo;
