const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const port = 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');




app.use('/', require('./routes/home.js'));
app.use('/expenses', require('./routes/expenses.js'));
app.use('/users', require('./routes/user'));


app.listen(port, () => {
  console.log(`Server is start on http://localhost:${port}`);
})