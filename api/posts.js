const express = require('express');
const postsRouter = express.Router();

const { getAllPosts } = require('../db');

postsRouter.get('/', async (req, res,) => {
    const posts = await getAllPosts();
    console.log('Posts Router Working!');
    
    res.send({
        posts
    });
});

module.exports = postsRouter;