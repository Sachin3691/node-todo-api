const {MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true } ,(error, client) => {
    if(error) {
        return console.log(`Unable to connect to MongoDb server.`);
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // -----------------------Get All

    // db.collection('Todos').find().toArray().then((docs)=>{ // toArray uses Promise
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err)
    // });

    // // -------------------------Query by values

    // db.collection('Todos').find({completed: false}).toArray().then((docs) => { // toArray uses Promise
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err)
    // });

    // //------------------Query by Id

    // db.collection('Todos').find({
    //     _id: new ObjectID('5b7ea618297ece3420325a4d')
    // })
    //     .toArray().then((docs) => { // toArray uses Promise
    //         console.log('Todos');
    //         console.log(JSON.stringify(docs, undefined, 2));
    //     }, (err) => {
    //         console.log('Unable to fetch todos', err)
    // });

    // // --------------------------Get Count

    // db.collection('Todos').find().count().then((count) => { // toArray uses Promise
    //     console.log(`Todos Count : ${count}`);
    //     //console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err)
    // });

    // Test

    db.collection('Users').find({ name: 'Sachin' })
        .toArray().then((docs) => {
            console.log('Users');
            console.log(JSON.stringify(docs, undefined, 2));
        }, (err) => {
            console.log('Unable to fetch users');
    });




    client.close();
} );