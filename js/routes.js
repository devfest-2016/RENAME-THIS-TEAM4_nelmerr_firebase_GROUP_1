(function () {

  'use strict';

  angular
    .module('app')
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('home', {
            url: '/',
            templateUrl: 'js/home/home.html',
            controller: 'HomeController as vm'
          })
          .state('registration', {
            url: '/registration',
            templateUrl: 'js/authentication/registration.html',
            controller: 'AuthenticationController as vm'
          })
          .state('login', {
            url: '/login',
            templateUrl: 'js/authentication/login.html',
            controller: 'AuthenticationController as vm'
          })
          .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'js/dashboard/dashboard.html',
            controller: 'DashboardController as vm'
          })
        $urlRouterProvider.otherwise('/');
    });

}())
