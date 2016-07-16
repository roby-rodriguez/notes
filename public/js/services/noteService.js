angular.module('notesApp')
    .service('NoteService', function($http) {
        this.createNote = function (data, next) {
            return $http.post('/note/create', data)
                .success(function(info){
                    next(null, info);
                })
                .error(function (err) {
                    next(err);
                });
        };
        this.readNotes = function (next) {
            return $http.get('/note/read')
                .success(function(notes){
                    next(null, notes);
                })
                .error(function (err) {
                    next(err);
                });
        };
});
