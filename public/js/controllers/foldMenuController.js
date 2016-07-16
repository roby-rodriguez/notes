angular.module('notesApp')
    .controller('FoldMenuController', function($scope, $window, $location) {

        $scope.isActive = function (path) {
            return $location.path() === path;
        };

        $window.notesUI.initFoldMenu();
    });
