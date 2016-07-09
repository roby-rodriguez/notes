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

Controller.read = function (req, res) {
    Note.find(req.params, function (err, found) {
        if (err) {
            res.status(400);
            res.json({ error: "Error finding " + JSON.stringify(req.params), message: err.toString() });
        } else {
            res.status(200);
            res.json(found);
        }
    });
};

Controller.update = function (req, res) {
    var query = { _id: req.params.id };

    Note.findOneAndUpdate(query, req.body, { new: true },function (err, found) {
        if (err) {
            res.status(400);
            res.json({ error: "Error updating note with id=" + query._id, message: err.toString() });
        } else {
            res.status(200);
            res.json(found);
        }
    });
};

module.exports = Controller;
