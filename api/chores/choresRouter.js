const express = require('express');

const router = express.Router();
let { chores, updateChores } = require('./choresData');
const { validateChoreID, validateChoreData } = require('../middleware');

router.use(express.json());
router.use('/:id', validateChoreID);

router.get('/', (req, res) => {
    const isCompleted = req.query.completed;
    let filteredChores = [];
    if (isCompleted === 'true')
        filteredChores = chores().filter(chore => chore.completed);
    if (isCompleted === 'false')
        filteredChores = chores().filter(chore => chore.completed === false);
    let choresToSend = isCompleted ? filteredChores : chores();
    res.status(200).json(choresToSend);
});

router.put('/:id', validateChoreData, (req, res) => {
    let newChore = req.body;
    let isCompleted;
    updateChores(chores().map(chore => {
        if (chore.id === +req.params.id) {
            isCompleted = req.body.completed
                ? req.body.completed
                : chore.completed;
            return {
                ...chore,
                completed: isCompleted,
                description: newChore.description,
            };
        } else return chore;
    }));
    res.status(200).json(chores());
});

router.delete('/:id', (req, res) => {
    let removedChore = chores().filter(chore => chore.id !== +req.params.id);
    updateChores(chores().filter(chore => chore.id !== +req.params.id));
    res.status(200).json(chores());
});

module.exports = router;
