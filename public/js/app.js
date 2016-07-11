angular.module("notesApp", [
    'ngRoute'
]).config(function ($routeProvider) {
    $routeProvider
        .when('/create', {
            templateUrl: 'views/create.html',
            controller: 'CreateController'
        })
        .otherwise({
            redirectTo: '/home'
        });
});
