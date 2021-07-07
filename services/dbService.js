// Services for CRUD database operations

angular.module('todoApp')
    .service('dbService', function($http) {
      

        // All tasks
        this.getTasks = function() {
            return $http.get('/tasks');
        }


        // Get task
        this.getTask = function(task_id) {
            return $http.get('/editTask/' + task_id);
        }


        // Create task
        this.createTask = function(task) {
            $http.post('/addTask', { 'name' : task.task_name, 'description' : task.task_description, 'assignee' : task.task_assignee, 'status' : task.status.id })
        }


        // Update task
        this.updateTask = function(task, task_status_select) {
            $http.put('/updateTask', { 'id' : task.id, 'name' : task.task_name, 'description' : task.task_description, 'assignee' : task.task_assignee, 'status' : task_status_select })
        }


        // Delete task
        this.deleteTask = function(task_id) {
            $http.delete('/deleteTask/' + task_id)
        }
    })