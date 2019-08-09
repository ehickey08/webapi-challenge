const { chores } = require('./chores/choresData');
const { people } = require('./people/peopleData');

exports.validatePersonID = function validatePersonID(req, res, next) {
    let personID = +req.params.id;
    if (!Number.isInteger(personID))
        res.status(400).json({
            message: 'The ID parameter must be an integer.',
        });
    let validID = people.find(person => person.id === personID);
    if (!validID)
        res.status(400).json({ message: 'There is no person with that ID.' });
    next();
};

exports.validateChoreData = function validateChoreData(req, res, next) {
    let newChore = req.body;
    if (newChore && !newChore.description)
        return res.status(404).json({
            message: 'You must include a description with your chore.',
        });
    next();
};

exports.validatePersonData = function validatePersonData(req, res, next) {
    let newPerson = req.body;
    if (newPerson && !newPerson.name)
        return res
            .status(404)
            .json({ message: 'You must include a name with your person.' });
    next();
};

exports.validateChoreID = function validateChoreID(req, res, next) {
    let choreID = +req.params.id;
    if (!Number.isInteger(choreID))
        res.status(400).json({
            message: 'The ID parameter must be an integer.',
        });
    let validID = chores.find(chore => chore.id === choreID);
    if (!validID)
        res.status(400).json({ message: 'There is no chore with that ID.' });
    next();
};
