var express         = require('express');
var NoteController  = require('../controller/note-ctrl');
var router          = express.Router();

router
    .post('/note/create', NoteController.create);

module.exports = router;
