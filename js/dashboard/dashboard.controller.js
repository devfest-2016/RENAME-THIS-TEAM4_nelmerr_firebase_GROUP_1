(function () {

  'use strict';

  function DashboardController($state, $scope, $firebaseObject, $firebaseArray, AuthenticationFactory, user) {
    var vm = this;

    const usersRef = firebase.database().ref('users')
    const productsRef = usersRef.child(user.$id).child('products')
    const vendorsRef = usersRef.child(user.$id).child('vendors')
    const productsArray = $firebaseArray(productsRef)
    const usersArray = $firebaseArray(usersRef)
    const vendorsArray = $firebaseArray(vendorsRef)

    // vm VARIABLES
    vm.store = user
    vm.products = productsArray
    vm.users = usersArray
    vm.myVendors = vendorsArray


    // CALLABLE METHODS
    vm.addProduct = addProduct
    vm.deleteProduct = deleteProduct
    vm.editProduct = editProduct
    vm.addVendor = addVendor

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


    // ADD VENDOR TO MY VENDORS
    function addVendor(vendor) {
      for (var i = 0; i < vendorsArray.length; i++) {
        if (vendorsArray[i].uid === vendor.uid) {
          var toastContent = '<i style="color: yellow;" class="fa fa-exclamation-triangle fa-lg" aria-hidden="true"></i> This user is already a favorite'
          // Display success message
          Materialize.toast(toastContent, 3000)
          return
        }
      }
      vendorsArray.$add(vendor)
      .then(function (data) {
        var toastContent = '<i style="color: green;" class="fa fa-check-circle fa-lg" aria-hidden="true"></i> Vendor Added to Favorites'
        // Display success message
        Materialize.toast(toastContent, 3000)
      })
      .catch(function (error) {
        console.error(error);
      })
    }
        //
        //
        // usersRef.child(userData.uid).set({
        //     uid: userData.uid,
        //     firstname: user.name,
        //     email: userData.email,
        //     role: user.role
        // })


  }

  angular
    .module('app')
    .controller('DashboardController', DashboardController)

}())
