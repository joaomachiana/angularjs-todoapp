var todoApp = angular.module('todoApp', ['ngRoute']);


todoApp.directive('taskListView', function() {

    return {
        restrict: 'AECM',
        templateUrl: '/pages/taskList.html',
        replace: true,
        controller: 'TaskController',
        scope: {
            tasks: "=",
            errorMessage: "@"
        }
    }
});


todoApp.controller('TaskController', ['$scope', '$http', function($scope, $http) {

    
    // List Tasks
    var getTasks = function() {
        $http.get('/tasks').then((response) => {
        $scope.tasks = response.data;
        }, (response) => {
            $scope.getErrMsg = "Error status: " + response;
        });
    }
    // Add Task
    $scope.addTask = function() {
        $http.post('/addtask', {'name' : $scope.task_name, 'description' : $scope.task_description, 'assignee' : $scope.task_assignee, 'status' : $scope.task_status}).then(function(data,
            status) {
                $scope.task_name = '';
                $scope.task_description = '';
                $scope.task_assignee = '';
                $scope.task_status = '';

                getTasks();
            })
    }
    
    getTasks();
}]);