// Module
var todoApp = angular.module('todoApp', ['ngRoute']);


// Controllers
todoApp.controller('taskController', ['$scope', '$http', 'dbService', '$window', function($scope, $http, dbService, $window) {

    $scope.default = [
        {'id' : '0', 'name' : 'Not Started'},
        {'id' : '1', 'name' : 'In Progress'},
        {'id' : '2', 'name' : 'Done'}
    ];

    // $scope.default =  [0, 1, 2];

    var getTasks = function() {
        dbService.getTasks().then((response) => {
            //console.log(response.data);
            $scope.tasks = response.data;
        }, (response) => {
            $scope.getErrMsg = 'Error: ' + response;
        });
    }


    // Add Task
    $scope.addTask = function() {
        dbService.createTask($scope.task);
        redirectHome();
    }


    // Edit Task
    $scope.getTask = function(task_id) {

        dbService.getTask(task_id).then((response) => {
            console.log(response.data);
            $scope.task = response.data;
            console.log('Entrou');
            redirectPage('edit');
        }, (response) => {
            $scope.getErrMsg = 'Error: ' + response;
        });

        
    }


    // Delete Task
    $scope.deleteTask = function(task_id) {
        dbService.deleteTask(task_id);
        redirectHome();
    }

    function redirectHome(){
        $window.location.href = '/';
    }


    function redirectPage(pageName, pageid) {
        switch(pageName) {
            case 'home':
                $window.location.href = '/';
                break;

            case 'add':
                $window.location.href = '/createTask';
                break;

            case 'edit':
                $window.location.href = '#/editTask/' + pageid;
                break;

            default:
                $window.location.href = '/';
        }
    }


    getTasks();
}]);


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

    .when('/editTask/:id', {
        templateUrl: '/pages/editTask.html',
        controller: 'taskController'
    })
});