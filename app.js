const express = require('express')
const app = express()
const path = require('path')
const port = 3000

const bodyParser = require('body-parser')

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
const article = require('./models/article')

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body-parser middleware 
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Set public folder
app.use(express.static(path.join(__dirname, 'public')))

//Home Route
app.get('/', function(req, res){
  Article.find({}, (err, articles) => {
    if(err){
      console.log(err)
    } else {
    res.render('index', {
      title: 'List of Articles',
      articles: articles
    });
  }
  })
});

//Add Route Get All
app.get('/articles/add', function(req, res){
  res.render('add_article', {
    title: "add article"
  })
})

//Add Route single article
app.get('/article/:id', (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    res.render('article', {
      article: article
    })
  })
})

//Add Submit POST Route
app.post('/articles/add', (req, res) => {
  const article = new Article();
  article.title = req.body.title
  article.author = req.body.author
  article.body = req.body.body

  article.save(err => {
    if(err){
      console.log(err)
      return
    } else {
      res.redirect('/')
    }
  })
})

//Start Server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})