const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log(`Unable to connect to MongoDb server.`);
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // // find, update, option, callback
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID("5b7f981e294fc4bb8f80e87a")
    // }, {
    //         $set: {
    //             completed: true
    //         }
    //     }, {
    //         returnOriginal: false
    //     }).then((result)=> {
    //         console.log(result);
    //     });

    db.collection('Users').findOneAndUpdate(
        {
            name: 'Jen'
        },
        {
            $set: {
                name: 'Sachin',
            },
            $inc: {
                age: 1
            }
        },
        {
            returnOriginal: false
        }
    ).then((result) => {
        console.log(result);
    });

    client.close();
});