angular.module('notesApp')
    .controller('HomeController', function($scope, $rootScope, $window, $injector, $timeout, NotesFactory) {

        $scope.loadNotes = function () {
            // load user notes
            NotesFactory.getNotes(function (err, res) {
                if (err) {
                    $rootScope.error = 'Could not load notes';
                    $rootScope.errorMessage = JSON.stringify(err);
                } else {
                    $scope.notes = res;
                    // when data ready, launch hydrogen theme
                    $window.notesUI.initHome();
                }
            });
        };

        $scope.loadNotes();
});
