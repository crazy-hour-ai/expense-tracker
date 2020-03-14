const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  return res.redirect('/');
})

router.get('/new', (req, res) => {
  return res.render('new');
})

router.post('', (req, res) => {
  return res.redirect('/');
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