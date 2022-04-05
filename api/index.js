const express = require('express');
const apiRouter = express.Router();

// added user rout
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

// added post rout
const postsRouter = require('./posts');
apiRouter.use('/posts', postsRouter);

// added tag rout
const tagsRouter = require('./tags');
apiRouter.use('/tags', tagsRouter);

module.exports = apiRouter;