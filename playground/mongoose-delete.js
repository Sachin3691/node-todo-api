const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');



const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');


//Todo.remove({}) - removes everything
// Todo.remove({}).then((result) => {
//     console.log(result);
// } )


Todo.findOneAndRemove({_id: '5b83d355dbf0677fba031086'}).then((todo)=>{
    console.log(todo);
});

// Todo.findByIdAndRemove('5b83d313dbf0677fba031060').then((todo)=> {
//     console.log(todo);
// })