//Object destructuring
// var user = { name: 'Sachin', age: 28};
// var {name} = user;
// console.log(name);

//const MongoClient = require('mongodb').MongoClient;
//const ObjectID = require('mongodb').ObjectID;
const {MongoClient, ObjectID } = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
    if(error) {
        return console.log(`Unable to connect to MongoDb server.`);
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     test: 'Something to do',
    //     completed: false
    // }, (err, result)=> {
    //     if(err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

//     db.collection('Users').insertOne({
//         //_id: 123, // Gets auto created if not passed. Also can use ObjectID. Ref above.
//         name: 'Sachin',
//         age: 28,
//         location: 'Bangalore'
//     }, (err, result)=> {
//         if(err) {
//             return console.log('Unable to insert todo', err);
//         }
// //        console.log(JSON.stringify(result.ops, undefined, 2));
//         console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
//     });

    client.close();
} );