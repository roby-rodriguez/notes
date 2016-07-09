// import necessary module(s)
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define a schema
var noteSchema = new Schema({
    title: String,
    image: String,
    content: { type: String, required: true },
    created: Date,
    updated: Date
});

// create a model using the defined schema
var Note = mongoose.model('Note', noteSchema);

// export this to other modules
module.exports = Note;
