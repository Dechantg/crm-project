

const multer = require('multer');

function configureMulterFile() {
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });

  return upload;
}

module.exports = configureMulterFile;