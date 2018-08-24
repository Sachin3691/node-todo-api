var mongoose =  require('mongoose');

mongoose.Promise = global.Promise; // Setup to use Promise instead of Callbacks
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });

module.exports = {
    mongoose: mongoose
};