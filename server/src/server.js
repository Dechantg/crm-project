require('dotenv').config();
const fs = require('fs');
const express = require("express");
const multer = require('multer');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const configureMulterFile = require('./helpers/mutlerFile');


// const multerFile = configureMulterFile();


const app = express();
app.set('view engine', 'ejs');



app.use(cors({origin: `http://localhost:3000`}));


const uploadSheetsRoute = require('./routes/uploadSheets');
const uploadImageRoute = require('./routes/uploadImage');
const uploadPDF = require('./routes/uploadPDF');
const getPdF = require('./routes/getPdfByPdf');
const getDocumentByUser = require('./routes/getDocumentByUser');
const getImageByUser = require('./routes/getImageByUser');
const getPdfByUser = require('./routes/getPdfByUser');
const getImageByImage = require('./routes/getImageByImage')
const getDocumentByDocument = require('./routes/getDocumentByDocument');
const uploadLicenceeList = require('./routes/uploadLicenceeList');
const getLicenceList = require('./routes/getLicenceList');
const createProducer = require('./routes/createProducer')
const getProducer = require('./routes/getProducers');
const createProduct = require('./routes/createProduct');
const createContact = require('./routes/createContact');
const createClient = require('./routes/createClient');
const resetDatabase = require('./routes/resetDatabase');



app.use('/upload/sheet', uploadSheetsRoute);
app.use('/upload/image', uploadImageRoute);
app.use('/upload/pdf', uploadPDF);
app.use('/download/pdf', getPdF);
app.use('/getdocument', getDocumentByUser);
app.use('/getimage', getImageByUser);
app.use('/getpdf', getPdfByUser);
app.use('/download/image', getImageByImage);
app.use('/download/document', getDocumentByDocument);
app.use('/upload/licenceelist', uploadLicenceeList);
app.use('/getlicencelist', getLicenceList);
app.use('/add/producer', createProducer);
app.use('/get/producers', getProducer);
app.use('/create/product', createProduct);
app.use('/add/contact', createContact);
app.use('/add/client', createClient);
app.use('/api/careful/reset/dontbedumb', resetDatabase)


const port = process.env.PORT;
const host = process.env.HOST;

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/image', (req, res) => {
  res.render('image');
});

app.get('/imagetest', (req, res) => {
  res.render('imagetest');
});

app.get('/pdf', (req, res) => {
  res.render('pdf');
});

app.get('/licencee', (req, res) => {
  res.render('uploadlicencee');
});




// app.post('/test', multerFile.single('file'), async (req, res) => {
//   console.log("Data being passed over", req.body)
//   console.log("file data:", req.file.buffer)
//   res.send("Test Completed I think")
// })



app.listen(port, host, () => {
  console.log(`Server is running on port ${port} and host ${host}`);
});

