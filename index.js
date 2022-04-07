require('dotenv').config();



const PORT = 3000;
const express = require('express');
const server = express();


const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.json());

server.use((req, res, next) => {
    console.log("<-----Body Logger STARTED ----->");
    console.log(req.body);
    console.log("<------Body Logger ENDED ----->");

    next();  // pass control to the next middleware function in this stack
})

const apiRouter = require('./api');
server.use('/api', apiRouter);

const { client } = require('./db');
client.connect();

server.listen(PORT, () => {
    console.log('listening on port', PORT)
});