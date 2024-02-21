






const db = require('../connection');


const addAlchType = async (alchType) => {
  try {
    const {alchClass} = alchType

    const data = await db.query(
      'INSERT INTO crm_alch_classes (alch_type) VALUES ($1) RETURNING id;',
      [alchClass]
    );

    const newAlchClass = data.rows[0].id;
    
    console.log("New Alch Class created with id ", newAlchClass)
    return newAlchClass;
  } catch (error) {
    console.error(`Error creating user: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addAlchType;