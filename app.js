const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const session = require('express-session');
const passport = require('passport');

const app = express();

const port = 3000;

if (process.env.NODE_env !== 'production') {
  require('dotenv').config();
}


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/record', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection;

db.on('error', () => {
  console.log('mongodb error');
})

db.once('open', () => {
  console.log('mongodb connected');
})

app.use(session({
  secret: 'my secret key',
  resave: false,
  saveUninitialized: true
})
)

app.use(passport.initialize());
app.use(passport.session());


require('./config/passport')(passport);

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();     // 辨識使用者是否已經登入的變數，讓 view 可以使用
  next()
})


app.use('', require('./routes/home.js'));
app.use('/records', require('./routes/record.js'));
app.use('/users', require('./routes/user'));
app.use('/auth', require('./routes/auths'))



app.listen(port, () => {
  console.log(`Server is start on http://localhost:${port}`);
})