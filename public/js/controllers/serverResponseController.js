angular.module('notesApp')
    .controller('ServerResponseController', function($scope, $rootScope) {
        $scope.clearMessages = function () {
            delete $rootScope.error;
            delete $rootScope.errorMessage;
            delete $rootScope.infoMessage;
        };
    });
