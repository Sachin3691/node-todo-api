const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

var port = process.env.PORT || 3000;

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
        if (!todo) {
            return res.status(404).send('No data');
        }
        res.status(200)
            .send({ todo });
    }).catch((e) => {
        return res.status(400).send(e);
    });
});

app.delete('/todo/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid ID');
    };

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.status(200)
            .send({ todo });
    }).catch((e) => {
        return res.status(400).send();
    });
});


app.patch('/todo/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed'])

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid ID');
    };

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then((todo) => {
            if (!todo) {
                return res.status(404).send()
            }
            res.send({ todo })
        }).catch((e) => {
            res.status(400).send()
        })

})

app.listen(port, () => {
    console.log(`Started on server port ${port}`);
});

module.exports = {
    app
};