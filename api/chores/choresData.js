let chores = [
    {
        description: 'Clean the house.',
        assignedTo: 1,
        id: 1,
        completed: false,
        notes: 'Especially the bathroom.'
    },
];

exports.updateChores = function(arr){
    chores = arr
}
exports.chores = function(){
    return chores
}