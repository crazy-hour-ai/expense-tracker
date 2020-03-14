
const express = require('express');
const router = express.Router();

const Record = require('../models/record.js');

router.get('/', (req, res) => {

  Record.find({})
    .lean()
    .find((err, records) => {
      if (err) {
        return console.log(err);
      }
      res.render('index', { records: records });
    })
})

module.exports = router;