angular.module("notesApp", [
    'ngRoute'
]).config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeController',
            controllerAs: 'hm'
        })
        .when('/create', {
            templateUrl: 'views/create.html',
            controller: 'CreateController'
        })
        .otherwise({
            redirectTo: '/home'
        });
});
