const express = require('express');
const router = express.Router();
const dropTables = require('../../database/queries/drop_tables');
const uploadSchema = require('../../database/queries/upload_schema');
const uploadSeeds = require('../../database/queries/upload_seeds');



router.get('/', async (req, res) => {
  try {
    await dropTables();

    await uploadSchema();

    await uploadSeeds();

    res.status(200).json({ success: true, message: 'Database initialized successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;