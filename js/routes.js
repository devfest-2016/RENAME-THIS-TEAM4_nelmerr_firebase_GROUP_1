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
            controller: 'DashboardController as vm',
            resolve: {
              // controller will not be loaded until $requireSignIn resolves
              // Auth refers to our $firebaseAuth wrapper in the factory below
              currentAuth: function($firebaseAuth) {
                // $requireSignIn returns a promise so the resolve waits for it to complete
                // If the promise is rejected, it will throw a $stateChangeError (see above)
                return $firebaseAuth().$requireSignIn();
              }
            }
          })
          // NESTED DASHBOARD ROUTES
          .state('dashboard.home', {
            url: '/home', // Blank Url to make this a nested default route
            templateUrl: 'js/dashboard/views/home.html',
            controller: 'DashboardController as vm'
          })
          .state('dashboard.orders', {
            url: '/orders',
            templateUrl: 'js/dashboard/views/orders.html',
            controller: 'DashboardController as vm'
          })
          .state('dashboard.messages', {
            url: '/messages',
            templateUrl: 'js/dashboard/views/messages.html',
            controller: 'DashboardController as vm'
          })
          .state('dashboard.products', {
            url: '/products',
            templateUrl: 'js/dashboard/views/products.html',
            controller: 'DashboardController as vm'
          })
          .state('dashboard.invoices', {
            url: '/invoices',
            templateUrl: 'js/dashboard/views/invoices.html',
            controller: 'DashboardController as vm'
          })
          .state('dashboard.vendors', {
            url: '/vendors',
            templateUrl: 'js/dashboard/views/vendors.html',
            controller: 'DashboardController as vm'
          })
        $urlRouterProvider.otherwise('/');
    });

}())
