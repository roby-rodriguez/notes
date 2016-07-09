var express         = require('express');
var NoteController  = require('../controller/note-ctrl');
var router          = express.Router();

router
    .post('/note/create', NoteController.create)
    .get('/note/read', NoteController.read)
    .get('/note/read/:title', NoteController.read)
    .get('/note/read/:title/:content', NoteController.read)
    .put('/note/update/:id', NoteController.update)
    .delete('/note/delete/:id', NoteController.delete);

module.exports = router;
