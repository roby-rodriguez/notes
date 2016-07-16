angular.module('notesApp')
    .factory('NotesFactory', function(NoteService) {
        var notes = [];

        return {
            getNotes: function(next) {
                if (next) {
                    NoteService.readNotes(function (err, res) {
                        notes = res;
                        next(err, res)
                    })
                }
                return notes;
            }
        };
    });
