const express = require('express');

const server = express();

const choresRouter = require('./chores/choresRouter');

const peopleRouter = require('./people/peopleRouter');

server.use('/chores', choresRouter);
server.use('/people', peopleRouter);

module.exports = server;
