
const express = require('express');
const router = express.Router();

const Record = require('../models/record.js');

const { authenticated } = require('../config/auth.js')

router.get('/', authenticated, (req, res) => {

  const searchKeyword = req.query.keyword;

  let totalAmount = 0;
  Record.find({})
    .lean()
    .find((err, records) => {
      if (err) {
        return console.log(err);
      }
      records.forEach(record => {
        totalAmount = totalAmount + record.amount;
      })

      res.render('index', { records: records, totalAmount: totalAmount });
    })

})


router.get('/search', authenticated, (req, res) => {

  const searchKeyword = req.query.keyword;

  let totalFilterAmount = 0;
  Record.find({})
    .lean()
    .find((err, records) => {
      if (err) {
        return console.log(err);
      }
      const search = records.filter((searchResult) => {
        return searchResult.category.includes(searchKeyword);
      })
      search.forEach(result => {
        totalFilterAmount = totalFilterAmount + result.amount;
      })
      //search[0].amount;

      res.render('index', { records: search, totalAmount: totalFilterAmount, keyword: searchKeyword });
    })

})

module.exports = router;