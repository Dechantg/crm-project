
const fs = require('fs');
const db = require('../connection');

const uploadSchema = async () => {
  try {
    const schemaSql = fs.readFileSync('../01-schema.sql', 'utf-8');

    const queries = schemaSql.split(';').map(query => query.trim()).filter(Boolean);

    for (const query of queries) {
      await db.query(query);
    }

    console.log('Schema uploaded successfully');
  } catch (error) {
    console.error(`Error uploading schema: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = uploadSchema;