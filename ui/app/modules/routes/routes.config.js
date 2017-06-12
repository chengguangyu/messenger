(function() {
    'use strict';

    angular.module('app.routes').config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider'];

    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {        
        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // defaults to welcome
        $urlRouterProvider.otherwise('/app/welcome');

        // Application Routes
        $stateProvider.state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'views/app.html'
        }).state('app.welcome', {
            url: '/welcome',
            title: 'Welcome',
            templateUrl: 'views/welcome.html'
        }).state('app.poster', {
            url: '/poster',
            title: 'Poster',
            templateUrl: 'views/poster.html',
            controller: 'PosterController',
            controllerAs: 'poster'
        }).state('app.lister', {
            url: '/lister',
            title: 'Lister',
            templateUrl: 'views/lister.html',
            controller: 'ListerController',
            controllerAs: 'lister'
        }).state('app.about', {
            url: '/about',
            title: 'About',
            templateUrl: 'views/about.html'
        }).state('app.docs', {
            url: '/docs',
            title: 'Documents',
            templateUrl: 'views/docs.html'
        });
    } // routesConfig
})();
