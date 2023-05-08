module.exports = (post) => `<div class="news-item">
  <header><img src="/logo.png" />Wizard News</header>
  <p>
    <span class="news-position">${post.id}. ▲</span>
    ${post.title}
    <small>(by ${post.name})</small>
  </p>
  <p>
    <strong>${post.content}</strong>
  </p>
  <small class="news-info"> ${post.upvotes} upvotes | ${post.date} </small>
</div>`;
