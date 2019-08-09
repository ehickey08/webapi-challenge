const express = require('express');
let { people, updatePeople } = require('./peopleData');
const { chores, updateChores } = require('../chores/choresData');
const {
    validatePersonData,
    validatePersonID,
    validateChoreData,
} = require('../middleware');

const router = express.Router();
router.use(express.json());
router.use('/:id', validatePersonID);
let id = 4;
let choresID = 2;

router.get('/', (req, res) => {
    res.status(200).json(people());
});

router.get('/:id', (req, res) => {
    let person = people().filter(person => person.id === +req.params.id)[0];
    let personsChores = chores().filter(
        chore => chore.assignedTo === +req.params.id
    );
    let personObj = { ...person, chores: personsChores };
    res.status(200).json(personObj);
});

router.get('/:id/chores', (req, res) => {
    let personsChores = chores().filter(
        chore => chore.assignedTo === +req.params.id
    );
    res.status(200).json(personsChores);
});

router.post('/:id/chores', validateChoreData, (req, res) => {
    let newChore = req.body;
    newChore.assignedTo = +req.params.id;
    newChore.id = choresID++;
    newChore.completed = false;
    updateChores([...chores(), newChore]);
    res.status(201).json(newChore);
});

router.post('/', validatePersonData, (req, res) => {
    let newPerson = req.body;
    newPerson.id = id++;
    let newPeopleArr = [...people(), newPerson]
    updatePeople(newPeopleArr)
    res.status(201).json(newPerson);
});

router.put('/:id', validatePersonData, (req, res) => {
    let newPerson = req.body;
    let changedPeople = people().map(person => {
        if (person.id === +req.params.id)
            return { id: person.id, name: newPerson.name };
        else return person;
    });
    updatePeople(changedPeople)
    res.status(200).json(changedPeople);
});

router.delete('/:id', (req, res) => {
    let removedPerson = people().filter(person => person.id !== +req.params.id);
    let peopleKept = people().filter(person => person.id !== +req.params.id);
    updatedPeople(peopleKept)
    res.status(200).json(removedPerson);
});

module.exports = router;

