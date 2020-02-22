/* eslint-disable */
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const IncomingForm = require("formidable").IncomingForm;

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.post("/upload", upload);
app.get('/ping', function (req, res) {
  console.log('ping')
  return res.send('pong');
});

app.get('/', function (req, res) {
  console.log('serve')
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);

function upload(req, res) {
  var form = new IncomingForm();
  let file;
  form.on("file", (field, uploadedFile) => {
    file = uploadedFile;
  });
  form.on("end", () => {
    const path = file.path;
    const fileName = path.match(/[^/]+$/)[0];
    const newPath = `/uploads/${fileName}.jpg`
    fs.rename(file.path, '.' + newPath, () => {
      res.json({ success: true, path: newPath });
    });
  });
  form.parse(req);
}
