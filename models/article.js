const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodekb', {useNewUrlParser: true});

//Schema
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
  });

  const Article = module.exports = mongoose.model('Article', articleSchema);