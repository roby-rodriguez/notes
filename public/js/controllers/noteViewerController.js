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
					$.magnificPopup.instance.close();
                }
            });
        };
        $scope.delete = function () {
            var selected = NoteViewerFactory.getNote();
            NoteService.deleteNote(selected._id, function (err) {
                if (err) {
                    $rootScope.error = 'Could not delete note';
                    $rootScope.errorMessage = JSON.stringify(err);
                } else {
                    $rootScope.infoMessage = 'Deleted note: ' + JSON.stringify(selected);
					$route.reload();
					$.magnificPopup.instance.close();
                }
            });
        };
});
