const express = require('express')
const app = express()
const path = require('path')
const port = 3000

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Home Route
app.get('/', function(req, res){

  let articles = [
    {
      id:1,
      title:'Article 1',
      author:'someone',
      body:'something writing here'
    },
    {
      id:2,
      title:'Article 2',
      author:'someone',
      body:'something writing here'
    },
    {
      id:3,
      title:'Article 3',
      author:'someone',
      body:'something writing here'
    }
  ];

  res.render('index', {
    title: 'This is a variable',
    articles: articles
  });
});

//Add Route
app.get('/articles/add', function(req, res){
  res.render('add_article', {
    title: "add article"
  })
})

//Start Server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})