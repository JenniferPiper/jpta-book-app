'use strict';

const express  = require('express');

const app = express();

const PORT = process.env.PORT || 3500;

app.set('view-engine', 'ejs');

let list = [1,2,3,4,5];

app.get('/', (request, response) => {
  response.render('pages/index.ejs');

});

app.get('*', (request, response) => response.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`server is up on port ${PORT}`));
