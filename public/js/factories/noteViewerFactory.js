angular.module('notesApp')
    .factory('NoteViewerFactory', function() {
        var note = {};

        return {
            setNote: function(data) {
                note = data;
            },
            getNote: function() {
                return note;
            }
        };
});
