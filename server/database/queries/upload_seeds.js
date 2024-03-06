
const fs = require('fs');
const db = require('../connection');

const uploadSeeds = async () => {
  try {
    const seedsSql = fs.readFileSync('../02-seeds.sql', 'utf-8');

    const queries = seedsSql.split(';').map(query => query.trim()).filter(Boolean);

    for (const query of queries) {
      await db.query(query);
    }

    console.log('Seeds uploaded successfully');
  } catch (error) {
    console.error(`Error uploading seeds: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = uploadSeeds;
