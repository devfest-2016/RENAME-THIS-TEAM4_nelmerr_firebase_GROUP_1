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
        $urlRouterProvider.otherwise('/');
    });

}())
