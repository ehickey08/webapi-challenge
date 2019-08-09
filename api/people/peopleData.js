let people = [
    { id: 1, name: 'Bob' },
    { id: 2, name: 'Bill' },
    { id: 3, name: 'Greg' },
]

exports.updatePeople = function(arr) {
    people = arr;
}
exports.people = function(){
    return people
};
