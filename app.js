const express = require('express');
const morgan = require('morgan');
const postBank = require('./postBank');
//const path = require('path');
const postList = require('./view/postList');
const postDetails = require('./view/postDetails');

//const timeAgo = require('node-time-ago');

const app = express();

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  const posts = postBank.list();

  res.send(postList(posts));
});

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);

  res.send(postDetails(post));
});

//app.use(express.static(path.join(__dirname, 'public')));

const { PORT = 1337 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
