(function() {

    'use strict'

    function AuthenticationFactory($state, $firebaseAuth) {

        // Firebase Authorization Object
        var auth = firebase.auth()

        return {
            authObj: authObj,
            user: user,
            logout: logout
        }

        // ########## DEFINED FUNCTIONS ##########

        // RETURN FIREBASE AUTH OBJECT
        function authObj() {
            return auth
        }

        // RETURN CURRENT USER OBJECT IF THERE IS ONE
        function user() {
            return auth.currentUser
        }

        // LOGOUT
        function logout() {
            auth.signOut().then(function() {
                // Refresh Page
                $state.go('home', {}, {
                    reload: true
                });
                // Sign-out successful.
                console.log('USER LOGGED OUT');

            }, function(error) {
                // An error happened.
                console.error(error);
            });
        }

    }


    angular
        .module('app')
        .factory('AuthenticationFactory', AuthenticationFactory)

}())
