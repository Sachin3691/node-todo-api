const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
},
{
    _id: new ObjectID(),
    text: 'Second test todo'
}]

beforeEach((done) => {
    Todo.deleteMany({}).then(() => {
        Todo.insertMany(todos);
    }).then( ()=> done() );
})
describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test for text';

        request(app)
            .post('/todos')
            .send({
                text: text
            })
            .expect(302)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({ text:text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => {
                    done(e);
                })
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e))
            })
    });

});

describe('GET /todos', () => {
    it('should return all todos', () => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.length).toBe(2)
            })
    });

});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            //.expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
                
            }).end(done);
    });

    it('should not return 404 if not found', (done) => {
        request(app)
            .get(`/todos/${ new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should not return 404 if not valid', (done) => {
        request(app)
            .get(`/todos/${ new ObjectID()}123`)
            .expect(404)
            .end(done);
    });

});