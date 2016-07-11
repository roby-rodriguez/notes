angular.module('notesApp')
    .controller('CreateController', function($scope, $rootScope, $location, NoteService) {
        $scope.note = {};
        $scope.create = function () {
            NoteService.createNote($scope.note, function (err, res) {
                if (err) {
                    $rootScope.error = 'Could not create note';
                    $rootScope.errorMessage = JSON.stringify(err);
                } else {
                    $rootScope.infoMessage = 'Added note: ' + JSON.stringify(res);
                    $location.path('/home');
                }
            });
        };
});
