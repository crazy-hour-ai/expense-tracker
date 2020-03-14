
const mongoose = require('mongoose');
const recordList = require('../../data/record.json').records
const Record = require('../../models/record.js');

mongoose.connect('mongodb://127.0.0.1:27017/record', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;

db.on('error', () => {
  console.log('db error');
})

db.once('open', () => {
  console.log('db connected');

  recordList.forEach((record) => {
    Record.create({
      name: record.name,
      category: record.category,
      date: record.date,
      amount: record.amount
    })
  });
  console.log('done');

})

