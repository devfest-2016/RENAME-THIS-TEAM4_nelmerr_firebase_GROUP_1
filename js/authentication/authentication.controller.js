(function() {

    'use strict'

    function AuthenticationController($scope, $state, AuthenticationFactory) {

        var vm = this;

        // Firebase Authorization Object
        var auth = AuthenticationFactory.authObj()

        // vm VARIABLES
        vm.loginUser = {}

        // CALLABLE METHODS
        vm.createUser = createUser
        vm.loginWithPassword = loginWithPassword
        vm.loginWithGoogle = loginWithGoogle
        vm.logout = logout


        // LISTEN TO AUTH STATE CHANGES
        auth.onAuthStateChanged(function(user) {
            console.log('user', user);
            redirectIfUser();
            // Populate variable vm.currentUser with
            // user Object for Dom manipulation
            vm.currentUser = user
        })


        // ########## DEFINED FUNCTIONS ##########

        // CHECK FOR SIGNED IN USER
        function redirectIfUser() {
          // Redirect to dashboard if user is signed in
          if (AuthenticationFactory.user() !== null) {
            $state.go('dashboard.home')
          }
        }

        // CREATE USER
        function createUser(user) {
            // If there is already a user logged in,
            // log them out before proceeding
            auth.signOut()

            return auth.createUserWithEmailAndPassword(user.email, user.password)
                .then(function(userData) {
                    // Save user to Database
                    saveUser(userData, user);
                    // loginWithPassword()
                    loginWithPassword(user)
                })
                .catch(handleError)
        }

        // SAVE USER TO DATABASE
        function saveUser(userData, user) {
            // Save user data at the /users endpoint
            const usersRef = firebase.database().ref('users');
            // Append user into /users with UID
            usersRef.child(userData.uid).set({
                uid: userData.uid,
                firstname: user.name,
                email: userData.email,
                role: user.role
            })
        }

        // LOGIN WITH PASSWORD
        function loginWithPassword(user) {
            return auth.signInWithEmailAndPassword(user.email, user.password)
                .then(loginSuccess)
                .catch(handleError)
        }

        function loginSuccess() {
            console.log('USER LOGGED IN');
            // Go to success page
            $state.go('dashboard');
        }

        function handleError(error) {
            console.log(error);
            // Popoulate Error Message to be displayed
            vm.message = error.message
            $scope.$apply()
        }

        // TODO LOGIN WITH GOOGLE
        function loginWithGoogle() {
          alert("Sorry, this button is currently under construction")
        }

        // LOGOUT
        function logout() {
            AuthenticationFactory.logout()
        }

    }

    angular
        .module('app')
        .controller('AuthenticationController', AuthenticationController)

}())
