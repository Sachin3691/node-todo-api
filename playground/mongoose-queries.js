var { mongoose } = require('../server/db/mongoose');
var { Todo } = require('../server/models/todo');

var id = '5b7fd284e5499647508daada';

Todo.find({
    _id: id // auto convert string to ObjectID
}).then((todos) => {
    console.log("Todos", todos);
}, (e) => {
    console.log(e);
});

Todo.findOne({
    _id: id // auto convert string to ObjectID
}).then((todo) => {
    console.log("Todos", todo);
}, (e) => {
    console.log(e);
});

//Todo.findById()//