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
    .module('app', ['ui.router','firebase','ngMessages','ngAnimate', 'ngSanitize']);

}())
