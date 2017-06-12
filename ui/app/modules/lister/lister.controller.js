(function() {
    'use strict';

    // Remove an item from an array by id
    function deleteItemById(id, items) {
        for (var i = 0; i < items.length; i++) {
            if (id === items[i].id) {
                items.splice(i, 1);
                break;
            }
        }
    }

    angular.module('app.lister').controller('ListerController', ListerController);
    ListerController.$inject = ['$scope', '$http'];

    function ListerController($scope, $http) {
        var vm = this;

        activate();

        function activate() {
            var timezone = jstz.determine();

            vm.users = [];
            vm.messages = [];
            vm.executor = {};
            vm.executor.working = false;
            vm.executor.showDetailsPanel = false;

            vm.init = function() {
                $http.get('/api/users').success(function(data) {
                    if (data.success) {
                        vm.users = data.users;
                        vm.executor.user = vm.users[0];
                        vm.onUserChanged();
                    }
                });
            };

            vm.onUserChanged = function() {
                if (vm.executor.user) {
                    vm.closeDetailsPanel();
                    vm.getMessages(vm.executor.user.id);
                }
            };

            $scope.sortMessage = function(keyname) {
                $scope.messageSortKey = keyname;
                $scope.messageReverse = !$scope.messageReverse;
            };

            vm.renderTime = function(value) {
                if (value) {
                    return moment(value).tz(timezone.name()).format('YYYY-MM-DD HH:mm:ss A z');
                } else {
                    return 'N/A';
                }
            };

            vm.getMessages = function(userid) {
                var url = '/api/messenger/users/' + userid;

                vm.executor.working = true;
                vm.executor.message = '';

                $http.get(url).success(function(data) {
                    vm.executor.working = false;
                    vm.executor.message = data.message;

                    if (data.success) {
                        vm.messages = data.data;
                    }
                });
            };

            vm.closeDetailsPanel = function() {
                vm.executor.showDetailsPanel = false;
            };

            vm.displayDetailsPanel = function(message) {
                var url = '/api/messenger/messages/' + message.id;

                vm.executor.working = true;
                vm.executor.message = '';

                $http.get(url).success(function(data) {
                    vm.executor.working = false;
                    vm.executor.message = data.message;

                    if (data.success) {
                        vm.executor.showDetailsPanel = true;
                        vm.executor.msg = data.data;
                    }
                });
            };

            vm.isMessagePalindrome = function(message) {
                // remove special characters, spaces and make lowercase
                var content = message.content;
                var removeChar = content.replace(/[^A-Z0-9]/ig, '').toLowerCase();
                // reverse removeChar for comparison
                var checkPalindrome = removeChar.split('').reverse().join('');
                return removeChar === checkPalindrome ? true : false;
            };

            vm.deleteMessage = function(message) {
                var url = '/api/messenger/' + message.id;

                vm.executor.working = true;
                vm.executor.message = '';

                $http.delete(url).success(function(data) {
                    vm.executor.working = false;
                    vm.executor.message = data.message;

                    if (data.success) {
                        deleteItemById(message.id, vm.messages);
                    }
                });
            };

            vm.init();
        } // end of activate
    }
})();
