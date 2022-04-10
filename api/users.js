const express = require('express');
const usersRouter = express.Router();
const { getUserByUsername, createUser } = require('../db');

const jwt = require('jsonwebtoken');

const {JWT_SECRET} = process.env;

const { getAllUsers } = require('../db');

usersRouter.get('/', async (req, res) => {
    const users = await getAllUsers();
    console.log('User Router Working!!');

     return res.send({
        users
    });
});

// Will change inner block after we log the req body
usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        next({
            name: "MissingCredentialsError",
            message: "username and password both required"
        });
    }

    try {
        const user = await getUserByUsername(username);

        if (user && user.password == password) {
            const token = jwt.sign(user, JWT_SECRET);
            console.log('token ', token);
            res.send({message: "your're logged in!!"});
        } else {
            next({
                name: 'IncorrectCredentialsError', 
                message: 'Username or password is not found'
            });
        } 
    } catch(error) {
        console.log(error);
        next(error);
    }
});

usersRouter.post('/register', async (req, res, next) => {
    const { username, password, name, location } = req.body;
  
    try {
      const existingUser = await getUserByUsername(username);
  
      if (existingUser) {
        next({
          name: 'UserExistsError',
          message: 'A user by that username already exists'
        });
      }
  
      const user = await createUser({
        username,
        password,
        name,
        location,
      });
  
      const token = jwt.sign({ 
        id: user.id, 
        username
      }, process.env.JWT_SECRET, {
        expiresIn: '30d'
      });
  
      res.send({ 
        message: "thank you for signing up",
        token 
      });
    } catch ({ name, message }) {
      next({ name, message })
    } 
  });

module.exports = usersRouter;