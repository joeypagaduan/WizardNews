const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");
const path = require('path');

const app = express();

app.use(morgan('dev'));

app.get("/", (req, res) => {
  const posts = postBank.list();

  const html = 
  `<!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div class="news-list">
        <header><img src="/logo.png"/>Wizard News</header>
        ${posts.map(post => `
          <div class='news-item'>
            <p>
              <span class="news-position">${post.id}. ▲</span>
              <a href="/posts/${post.id}">${post.title}</a>
              <small>(by ${post.name})</small>
            </p>
            <small class="news-info">
              ${post.upvotes} upvotes | ${post.date}
            </small>
          </div>`
        ).join('')}
      </div>
    </body>
  </html>`

  res.send(html);
});

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);
  const postDetails = 
    `<div class='news-item'>
      <header><img src="/logo.png"/>Wizard News</header>
      <p>
        <span class="news-position">${post.id}. ▲</span>
        ${post.title}
        <small>(by ${post.name})</small>
      </p>
      <p>
        <strong>${post.content}</strong>
      </p>
      <small class="news-info">
        ${post.upvotes} upvotes | ${post.date}
      </small>
    </div>`

  if (!post.id) {
    throw new Error('Page Not Found!');
  } else {
    res.send(postDetails);
  }
});

app.use(express.static(path.join(__dirname, 'public')));

const { PORT = 1337 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
