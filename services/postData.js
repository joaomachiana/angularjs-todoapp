angular.module('todoApp')
    .factory('postData', function() {
        var savedData = {};


        function set(data) {
            this.savedData = data;
        }


        function get(){
            return this.savedData;
        }


        return {
            set: set,
            get: get
        }
    });