const express = require('express');
const router = express.Router();

const Record = require('../models/record.js');
const Category = require('../data/category.json').categories;

router.get('/', (req, res) => {
  return res.redirect('/');
})

router.get('/new', (req, res) => {
  return res.render('new', { category: Category });
})

router.post('/', (req, res) => {

  const record = new Record({
    name: req.body.name,
    date: req.body.date,
    category: req.body.category,
    amount: req.body.amount
  })

  record.save(err => {
    if (err)
      return console.log(err)
    return res.redirect('/')
  })
})

router.get('/:id/edit', (req, res) => {
  return res.render('edit');
})

router.put('/:id/edit', (req, res) => {
  return res.redirect('/')
})

router.delete('/:id/delete', (req, res) => {
  return res.redirect('/');
})

module.exports = router;