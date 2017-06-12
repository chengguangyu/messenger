(function() {
    'use strict';

    angular.module('app.poster').controller('PosterController', PosterController);
    PosterController.$inject = ['$scope', '$http'];

    function PosterController($scope, $http) {
        var vm = this;

        activate();

        function activate() {
            vm.users = [];
            vm.messages = [];
            vm.executor = {};
            vm.executor.working = false;
            vm.msg = {};

            vm.init = function() {
                vm.msg.subject = null;
                vm.msg.content = null;

                $http.get('/api/users').success(function(data) {
                    if (data.success) {
                        vm.users = data.users;
                        vm.msg.receiver = vm.users[0];
                    }
                });
            };

            vm.submit = function() {
                if (vm.msg_form.$valid) {
                    var msg = {
                        subject: vm.msg.subject, 
                        content: vm.msg.content,
                        receiver: vm.msg.receiver.id,
                    };

                    vm.executor.working = true;
                    vm.executor.message = '';

                    $http.put('/api/messenger', msg).success(function(data) {
                        vm.executor.working = false;
                        vm.executor.message = data.message;

                        if (data.success) {
                            vm.messages.push(data.data);
                        }
                    });
                } else {
                    vm.msg_form.subject.$dirty = true;
                    vm.msg_form.content.$dirty = true;
                }
            };

            vm.init();
        } // end of activate
    }
})();
