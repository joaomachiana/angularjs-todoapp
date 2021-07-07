// Module
var todoApp = angular.module('todoApp', ['ngRoute']);

// Routes
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

    .when('/editTask/:task_id', {
        templateUrl: '/pages/editTask.html',
        controller: 'taskController'
    })
});