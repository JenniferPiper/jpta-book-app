'use strict';

const express = require('express');
const superagent = require('superagent');

const app = express();

const PORT = process.env.PORT || 3500;

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.set('view-engine', 'ejs');

//let listOfNumbers = [1, 2, 3, 4, 5];


function Book(rawBookData){
  this.title = rawBookData.volumeInfo.title;
}

app.get('/', (request, response) => {
  response.render('pages/index.ejs');

});

app.post('/searches', (request, response) => {
  const booksArray = [];
  superagent.get(`https://www.googleapis.com/books/v1/volumes?q=+intitle:${request.body.search[0]}`)
    .then(result => {
      for (let i = 0; i < 10 ; i++) {
        booksArray.push(new Book(result.body.items[i]));
      }
      console.log(booksArray);

       response.render('pages/searches/show.ejs', { searchResults: booksArray});
      //console.log('search results: ', result);
    })

});

app.use('*', (request, response) => response.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`server is up on port ${PORT}`));
