const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/record', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection;

db.on('error', () => {
  console.log('mongodb error');
})

db.once('open', () => {
  console.log('mongodb connected');
})

app.use(bodyParser.urlencoded({ extended: true }));

app.use('', require('./routes/home.js'));
app.use('/records', require('./routes/record.js'));
app.use('/users', require('./routes/user'));


app.listen(port, () => {
  console.log(`Server is start on http://localhost:${port}`);
})