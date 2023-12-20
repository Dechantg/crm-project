

const db = require('../connection');


const addLicenceeList = async (mappedObjects, chunkSize = 100) => {
  try {
    const columns = Object.keys(mappedObjects[0]);
    const placeholders = Array.from({ length: columns.length }, (_, i) => `$${i + 1}`).join(', ');

    const valuesArray = mappedObjects.map(obj => Object.values(obj));
    const queryBase = `
      INSERT INTO crm_licence_list (${columns.join(', ')})
      VALUES
    `;

    let currentIndex = 0;

    while (currentIndex < valuesArray.length) {
      const currentChunk = valuesArray.slice(currentIndex, currentIndex + chunkSize);

      const valueStrings = currentChunk.map((values, i) =>
        `(${Array.from({ length: columns.length }, (_, j) => `$${i * columns.length + j + 1}`).join(', ')})`
      ).join(', ');

      const query = `${queryBase} ${valueStrings} RETURNING *;`;

      const flattenedValues = currentChunk.reduce((acc, values) => acc.concat(values), []);

      try {
        const result = await db.query(query, flattenedValues);

        const newList = result.rows[0];
        // console.log("new image data from inside the query: ", newList);
      } catch (error) {
        console.error(`Error creating licence entries: ${error.message}`);
        throw { success: false, error: 'Internal Server Error' };
      }

      currentIndex += chunkSize;
    }

    return { success: true, message: 'Licence entries created successfully' };
  } catch (error) {
    console.error(`Error creating licence entries: ${error.message}`);
    throw { success: false, error: 'Internal Server Error' };
  }
};

module.exports = addLicenceeList;