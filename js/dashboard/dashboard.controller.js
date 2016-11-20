(function () {

  'use strict';

  function DashboardController($state, $scope, $firebaseObject, $firebaseArray, AuthenticationFactory, user) {
    var vm = this;

    const usersRef = firebase.database().ref('users')
    const productsRef = usersRef.child(user.$id).child('products')
    const productsArray = $firebaseArray(productsRef)

    // vm VARIABLES
    vm.store = user
    vm.products = productsArray


    // CALLABLE METHODS
    vm.addProduct = addProduct
    vm.deleteProduct = deleteProduct
    vm.editProduct = editProduct


    // INSTANTIADED METHODS

    //### DEFINED FUNCTIONS ###

    // ADD PRODUCT TO CURRENT USER DATABASE
    function addProduct(product) {
      productsArray.$add(product)
      .then(function (data) {
        var toastContent = '<i style="color: green;" class="fa fa-check-circle fa-lg" aria-hidden="true"></i> Product Added Succesfuly'
        // Refresh Page
        $state.go('dashboard.products', {}, { reload: true })
        // Display success message
        Materialize.toast(toastContent, 3000)
      })
      .catch(function (error) {
        console.error(error);
      })
    }

    // DELETE PRODUCT FROM DATABASE
    function deleteProduct(id) {
      var productObj = $firebaseObject(productsRef.child(id))
      productObj.$remove()
      .then(function (data) {
        var toastContent = '<i style="color: green;" class="fa fa-check-circle fa-lg" aria-hidden="true"></i> Product Removed Succesfuly'
        // Display success message
        Materialize.toast(toastContent, 3000)
      })
      .catch(function (error) {
        console.error(error);
      })
    }

    // EDIT PRODUCT
    function editProduct() {
      console.log('editing...');
    }


  }

  angular
    .module('app')
    .controller('DashboardController', DashboardController)

}())
