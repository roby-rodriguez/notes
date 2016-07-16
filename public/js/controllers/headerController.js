angular.module('notesApp')
    .controller('HeaderController', function($window) {
        $window.notesUI.initHeader();
    });
