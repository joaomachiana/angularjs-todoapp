var todoApp = angular.module('todoApp');

todoApp.config(function($routeProvider) {

    $routeProvider

    .when('/', {
        templateUrl: '/pages/listTasks.html',
        controller: 'taskController'
    })

    .when('/createTask', {
        templateUrl: '/pages/createTask.html',
        controller: 'taskController'
    })
});