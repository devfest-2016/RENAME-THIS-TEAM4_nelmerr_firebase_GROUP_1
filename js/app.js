(function () {

  'use strict'

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCHhD5SsdpTDRURbJD7I7J0mgnbCoObDOw",
    authDomain: "vendomatic-1ff02.firebaseapp.com",
    databaseURL: "https://vendomatic-1ff02.firebaseio.com",
    storageBucket: "vendomatic-1ff02.appspot.com",
    messagingSenderId: "157468088080"
  };
  firebase.initializeApp(config);

  angular
    .module('app', ['ui.router','firebase','ngMessages','ngAnimate', 'ngSanitize'])
    .config(function($animateProvider) {
      // Allow removing ngAnimate classes by adding 'ng-animate-disabled' class
      $animateProvider.classNameFilter(/^(?:(?!ng-animate-disabled).)*$/);
    })
    .run(function($rootScope, $state) {

      // SCROLL TO TOP ON STATE CHANGE
      $rootScope.$on("$stateChangeSuccess", function (event, currentRoute, previousRoute) {
          window.scrollTo(0, 0);
      });

      // REDIRECT USER TO LOGIN PAGE AND ASK TO LOGIN ON UNAUTHORIZED VIEWS
      $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
        // Toast HTML Message Conntent 'Please Login'
        var toastContent = '<i style="color: yellow;" class="fa fa-exclamation-triangle fa-lg" aria-hidden="true"></i> Please Log in'
        // We can catch the error thrown when the $requireSignIn promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
          $state.go("login");
          // Display Message Using Materialize Toast
          Materialize.toast(toastContent, 3000)
        }
      });

    });

}())
