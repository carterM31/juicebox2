const express = require('express');
const usersRouter = express.Router();
const { getUserByUsername } = require('../db');

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

// Will change inner block after we log teh req body
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

module.exports = usersRouter;