const express = require('express');

const router = express.Router();
const { chores } = require('./choresData');
const { validateChoreID } = require('../middleware');

router.use(express.json());
router.use('/:id', validateChoreID);

let id = 2;

router.get('/', (req, res) => {
    const isCompleted = req.query.completed;
    let filteredChores = [];
    if(isCompleted==='true')
        filteredChores = chores.filter(chore => chore.completed)
    if(isCompleted === 'false')
        filteredChores = chores.filter(chore => chore.completed===false)
    let choresToSend = isCompleted ? filteredChores : chores
    res.status(200).json(choresToSend);
});

router.put('/', (req, res) => {
    ``;
});

router.delete('/', (req, res) => {
    ``;
});

module.exports = router;
