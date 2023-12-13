

const { v4: uuidv4 } = require('uuid');

function generateUniqueFilename(originalFileName) {
  const fileExtention = originalFileName.split('.').pop();
  const uniqueFilename = `${uuidv4()}.${fileExtention}`;
  return uniqueFilename;

}

module.exports = generateUniqueFilename;