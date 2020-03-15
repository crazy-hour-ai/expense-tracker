const express = require('express');
const router = express.Router();

const Record = require('../models/record.js');
const Category = require('../data/category.json').categories;

const { authenticated } = require('../config/auth.js');

router.get('/', (req, res) => {
  return res.redirect('/');
})

router.get('/new', authenticated, (req, res) => {
  return res.render('new', { category: Category });
})

router.post('/', authenticated, (req, res) => {

  const record = new Record({
    name: req.body.name,
    date: req.body.date,
    category: req.body.category,
    amount: req.body.amount,
    userId: req.user._id
  })

  record.save(err => {
    if (err)
      return console.log(err)
    return res.redirect('/')
  })
})

router.get('/:id/edit', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id })
    .lean()
    .exec((err, recordEdit) => {
      if (err)
        return console.log(err);
      return res.render('edit', { record: recordEdit, category: Category })
    })
})

router.put('/:id/edit', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err)
      return console.log(err);
    record.name = req.body.name;
    record.category = req.body.category;
    record.date = req.body.date;
    record.amount = req.body.amount;

    record.save(err => {
      if (err)
        return console.log(err);
      res.redirect('/')
    })

  })
})

router.delete('/:id/delete', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err)
      return console.log(err);
    record.remove(err => {
      if (err)
        return console.log(err);
      return res.redirect('/');
    })
  })

})

module.exports = router;