const express = require('express')
const app = express()
const path = require('path')
const port = 3000

//Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodekb', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`MongoDB is connected`)
});

//Bring Models
let Article = require('./models/article')

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Home Route
app.get('/', function(req, res){
  Article.find({}, (err, articles) => {
    if(err){
      console.log(err)
    } else {
    res.render('index', {
      title: 'This is an article',
      articles: articles
    });
  }
  })
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