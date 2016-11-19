(function () {

  'use strict';

  function DashboardController($scope, $firebaseObject, $firebaseArray, AuthenticationFactory, user) {
    var vm = this;

    const usersRef = firebase.database().ref('users')

    // vm VARIABLES
    vm.store = user


    // CALLABLE METHODS


    // INSTANTIADED METHODS

    //### DEFINED FUNCTIONS ###


  }

  angular
    .module('app')
    .controller('DashboardController', DashboardController)

}())
