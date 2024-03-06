const fs = require('fs');
const db = require('../connection');

const dropTables = async () => {
  try {
    const dropTablesSql = fs.readFileSync('../drop_schema.sql', 'utf-8');

    const queries = dropTablesSql.split(';').map(query => query.trim()).filter(Boolean);

    for (const query of queries) {
      await db.query(query);
    }

    console.log('Tables dropped successfully');
  } catch (error) {
    console.error(`Error dropping tables: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = dropTables;
