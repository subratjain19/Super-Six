const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/super_six', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = new mongoose.Schema({
  creditScore: Number,
  creditLines: Number,
});

const Record = mongoose.model('Record', Schema);

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  const Data = [];
  fs.createReadStream(req.file.path).pipe(csvParser()).on('data', (row) => Data.push(row)).on('end', () => {
      Record.insertMany(Data, (error) => {
        if (error) {
          return res.status(500).send(error);
        }
        res.status(200).send('File uploaded.');
      });
      fs.unlinkSync(req.file.path);
    });
});
app.get('/records', async (req, res) => {
  const { count = 1, limit = 10 } = req.query;
  try {
    const records = await Record.find()
      .limit(Number(limit))
      .skip((Number(count) - 1) * Number(limit))
      .exec();
    const totalRecords = await Record.countDocuments();
    res.json({
      data: records,
      totalcounts: Math.ceil(totalRecords / Number(limit)),
      currentcount: Number(count),
    });
  } catch (error) {
    res.status(400).send(error);
  }
});
app.listen(3000, () => console.log('Server running on port 3000'));