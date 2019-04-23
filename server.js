'use strict';

const express  = require('express');

const app = express();

const PORT = process.env.PORT || 3500;

app.use(express.static('./public'));
app.use(express.urlencoded({extended:true}));
app.set('view-engine', 'ejs');

let listOfNumbers = [1,2,3,4,5];

app.get('/', (request, response) => {
  response.render('pages/index.ejs', {listOfNumbers: listOfNumbers});

});

app.post('/searches', (request, response) => {
  response.render('pages/index.ejs', {listOfNumbers: listOfNumbers});

});

app.use('*', (request, response) => response.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`server is up on port ${PORT}`));
