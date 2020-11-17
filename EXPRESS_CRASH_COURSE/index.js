const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const { parse } = require('path');
const members = require('./Members');

const app = express();

//const valami = "Mindjárt vége az órának.";

//app.use(logger);

//Handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded( { extended: false}));

//Homepage route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`A rendszer fut a ${PORT} számon.`));