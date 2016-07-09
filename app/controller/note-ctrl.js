var Note = require('../model/note');

var Controller = {};

Controller.create = function (req, res) {
    var note = new Note(req.body);

    note.save(function (err, saved) {
        if (err) {
            res.status(400);
            res.json({ error: "Error creating " + note.toString(), message: err.toString() });
        } else {
            res.status(201);
            res.json(saved);
        }
    });
};

module.exports = Controller;
