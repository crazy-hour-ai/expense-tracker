
const mongoose = require('mongoose');
const recordList = require('../../data/record.json').records;
const Record = require('../../models/record.js');

const categoryList = require('../../data/category.json').categories;
const Category = require('../../models/category.js');

mongoose.connect('mongodb://127.0.0.1:27017/record', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection;

db.on('error', () => {
  console.log('db error');
})

db.once('open', () => {
  console.log('db connected');

  // categoryList.forEach((categoryIndex, index) => {

  //   Category.create({
  //     category: categoryIndex.category,
  //     icon: categoryIndex.icon
  //   })
  //     .then(result => {

  recordList.forEach((record) => {
    Record.create({
      name: record.name,
      category: record.category,
      date: record.date,
      amount: record.amount,
      // categoryId: result._id
    })
  })
  console.log('done');

});


