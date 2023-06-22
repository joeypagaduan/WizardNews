const express = require("express");
const router = express.Router();

const {posts} = require('../postBank');

// GET routes
router.get('/posts/:id', (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find(post => post.id === id);
    res.send(post);
});




module.exports = router;