// Module
var todoApp = angular.module('todoApp', ['ngRoute']);


// Controllers
todoApp.controller('taskController', ['$scope', '$http', 'dbService', '$window', '$routeParams', function($scope, $http, dbService, $window, $routeParams) {

    $scope.default = [
        {'id' : '0', 'name' : 'Not Started'},
        {'id' : '1', 'name' : 'In Progress'},
        {'id' : '2', 'name' : 'Done'}
    ];

    // $scope.default =  [0, 1, 2];

    var getTasks = function() {

        console.log('Parametros ' + $routeParams.id);

        if ($routeParams.id) {

            dbService.getTask($routeParams.id).then((response) => {
                $scope.task = response.data[0];
            }, (response) => {
                $scope.getErrMsg = 'Error: ' + response;
            });

        } else {
            dbService.getTasks().then((response) => {
                //console.log(response.data);
                $scope.tasks = response.data;
                
            }, (response) => {
                $scope.getErrMsg = 'Error: ' + response;
            });    
        }
        
    }


    // Add Task
    $scope.addTask = function() {
        dbService.createTask($scope.task);
        redirectHome();
    }


    

    // Edit Task
    $scope.getTask = function(task_id) {

        redirectPage('edit', task_id);
       /** dbService.getTask(task_id).then((response) => {
            //console.log(response);
            //console.log(response.data);
            //$scope.task = response.data[0];
            // $scope.$watch('task', function() {
            //     $scope.task = response.data; 
            //  });
            //console.log("Scope: " + $scope);
            //console.log("Scoperr: " + $scope.task.name + " | " );
            
            $scope.task = response.data[0];
            
            console.log('Entrou');
            
        }, (response) => {
            $scope.getErrMsg = 'Error: ' + response;
        });*/

        
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