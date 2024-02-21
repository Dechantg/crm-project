






const db = require('../connection');


const addNonAlchType = async (nonAlchType) => {
  try {
    const {nonAlchClass} = nonAlchType

    const data = await db.query(
      'INSERT INTO crm_non_alch_classes (non_alch_type) VALUES ($1) RETURNING id;',
      [nonAlchClass]
    );

    const newNonAlchClass = data.rows[0].id;
    
    console.log("New Non Alch Class created with id ", newNonAlchClass)
    return newNonAlchClass;
  } catch (error) {
    console.error(`Error creating user: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addNonAlchType;