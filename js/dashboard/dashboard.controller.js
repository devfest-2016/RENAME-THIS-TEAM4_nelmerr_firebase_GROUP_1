(function () {

  'use strict';

  function DashboardController($scope, $firebaseObject, $firebaseArray, AuthenticationFactory) {

    var vm = this;

    const usersRef = firebase.database().ref('users')

    // vm VARIABLES



    // CALLABLE METHODS


    // INSTANTIADED METHODS

    //### DEFINED FUNCTIONS ###


  }

  angular
    .module('app')
    .controller('DashboardController', DashboardController)

}())
