var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

var port = process.env.port || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res
            .status(302)
            .send(doc);
    }, (e) => {
        res
            .status(400)
            .send(e);
    });

});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.status(200)
            .send({
                todos
            });
    }, (e) => {
        res.status(400)
            .send(e);
    })
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid ID');
    }
    Todo.findById(id).then((todo) => {
        if(!todo) {
            return res.status(404).send('No data');
        }
        res.status(200)
            .send({ todo });
    }).catch((e) => {
        return res.status(400).send(e);
    });
});

app.listen(port, () => {
    console.log(`Started on server port ${port}`);
});

module.exports = {
    app
};
