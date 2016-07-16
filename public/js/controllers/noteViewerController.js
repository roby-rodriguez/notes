angular.module('notesApp')
    .controller('NoteViewerController', function($scope, $rootScope, $route, NoteViewerFactory, NotesFactory, NoteService) {
        $scope.update = function () {
            var selected = NoteViewerFactory.getNote();
            NoteService.updateNote(selected._id, selected, function (err, res) {
                if (err) {
                    $rootScope.error = 'Could not update note';
                    $rootScope.errorMessage = JSON.stringify(err);
                } else {
                    $rootScope.infoMessage = 'Updated note: ' + JSON.stringify(res);
                    NotesFactory.getNotes(function (err) {
                        if (err) {
                            $rootScope.error = 'Could not load notes';
                            $rootScope.errorMessage = JSON.stringify(err);
                        } else {
                            $route.reload();
                            $.magnificPopup.instance.close();
                        }
                    })
                }
            });
        };
});
