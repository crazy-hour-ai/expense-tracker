
const mongoose = require('mongoose');
const recordList = require('../../data/record.json').records;
const Record = require('../../models/record.js');

const userList = require('../../data/user.json').users;
const User = require('../../models/user.js');

const categoryList = require('../../data/category.json').categories;
const Category = require('../../models/category.js');

const bcrypt = require('bcryptjs');


mongoose.connect('mongodb://127.0.0.1:27017/record', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection;

db.on('error', () => {
  console.log('db error');
})

db.once('open', () => {
  console.log('db connected');

  let recordListUser = [];

  // categoryList.forEach((categoryIndex, index) => {
  //   Category.create({
  //     category: categoryIndex.category,
  //     icon: categoryIndex.icon
  //   })
  //     .then(result => {

  console.log(recordList)

  userList.forEach((user, index) => {

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) throw err
        // newUser.password = hash;
        // newUser
        //   .save()
        //   .then(user => {
        //     res.redirect('/') // 新增完成導回首頁
        //   })
        //   .catch(err => console.log(err))
        User.create({
          name: user.name,
          email: user.email,
          // password: user.password
          password: hash

        })
          .then(userResult => {

            if (index === 0) {
              recordListUser = recordList.slice(0, 5);
            }
            else {
              recordListUser = recordList.slice(5, 10);
            }

            recordListUser.forEach((record) => {
              Record.create({
                name: record.name,
                category: record.category,
                date: record.date,
                amount: record.amount,
                userId: userResult._id
                // categoryId: result._id
              })
            })
          })
      })

    })
  })
  console.log('done');
})



