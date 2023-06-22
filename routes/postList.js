const express = require("express");
const router = express.Router();
const timeAgo = require('node-time-ago');

const {posts} = require('../postBank');

// GET routes
router.get('/posts', (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find(post => post.id === id);
    res.send(post);
});

app.get("/posts", (req, res) => {
    const posts = postBank.list();
  
    const listHtml = 
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
                ${post.upvotes} upvotes | ${timeAgo(post.date)}
              </small>
            </div>`
          ).join('')}
        </div>
      </body>
    </html>`
  
    res.send(listHtml);
  });




module.exports = router;