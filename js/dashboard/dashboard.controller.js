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
    vm.orderVendor = {}
    vm.orderSheet = []
    vm.total = 0


    // CALLABLE METHODS
    vm.addProduct = addProduct
    vm.deleteProduct = deleteProduct
    vm.editProduct = editProduct
    vm.addVendor = addVendor
    vm.changeVendor = changeVendor
    vm.addToOrder = addToOrder
    vm.updateQuantityPlus = updateQuantityPlus
    vm.updateQuantityLess = updateQuantityLess
    vm.removeFromOrder = removeFromOrder
    vm.calculateTotal = calculateTotal
    vm.sendOrder = sendOrder

    // INSTANTIADED METHODS

    //### DEFINED FUNCTIONS ###

    // ########### VENDOR PRODUCTS SECTION ###########

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

    // ########### RESTAURANTS VENDOR MANAGEMENT SECTION ###########

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

    // ########### PLACING ORDERS SECTION ###########

    // CHANGE ORDER VENDOR
    function changeVendor() {
      for (var i = 0; i < vm.myVendors.length; i++) {
        if (vm.myVendors[i].uid == vm.orderVendorId) {
          var currentVendorProductsRef = usersRef.child(vm.orderVendorId).child('products')
          var currentVendorProductsArray = $firebaseArray(currentVendorProductsRef)
          vm.currentVendor = vm.myVendors[i]
          vm.currentVendorProducts = currentVendorProductsArray
          vm.orderSheet = []
        }
      }
    }

    // ADD PRODUCTS TO ORDER SHEET
    function addToOrder(product) {
      for (var i = 0; i < vm.orderSheet.length; i++) {
        if (vm.orderSheet[i].$id === product.$id) {
          var toastContent = '<i style="color: yellow;" class="fa fa-exclamation-triangle fa-lg" aria-hidden="true"></i> Item Already in order please update quantity'
          // Display success message
          Materialize.toast(toastContent, 4000)
          return
        }
      }
      product.quantity = 1
      vm.orderSheet.push(product)
      console.log(vm.orderSheet);
      calculateTotal()
    }

    // UPDATE ITEM QUANTITY
    function updateQuantityPlus(product) {
      product.quantity++
      calculateTotal()
    }

    // UPDATE ITEM QUANTITY
    function updateQuantityLess(product) {
      if (product.quantity === 0) {
        product.quantity = 0
        calculateTotal()
        return
      }
      product.quantity = product.quantity - 1
      calculateTotal()
    }

    // REMOVE ITEM FROM ORDER SHEET
    function removeFromOrder(productId) {
      for (var i = 0; i < vm.orderSheet.length; i++) {
        if (vm.orderSheet[i].$id === productId) {
          // Remove from ordersheet
          vm.orderSheet.splice( i, 1 )
          calculateTotal()
        }
      }
    }

    // CALCULATES TOTAL ORDER VALUE
    function calculateTotal() {
      var totalOrederValue = 0
      for (var i = 0; i < vm.orderSheet.length; i++) {
        totalOrederValue = totalOrederValue + (vm.orderSheet[i].price * vm.orderSheet[i].quantity)
      }
      vm.total = totalOrederValue
      console.log('TOTAL IS = ' + vm.total);
    }

    // SEND ORDER TO VENDOR
    function sendOrder() {
      var finalOrder = {}
      for (var i = 0; i < vm.orderSheet.length; i++) {
        finalOrder["item "+ i] = vm.orderSheet[i]
      }
      finalOrder["checked"] = false
      finalOrder["restaurant"] = vm.store.firstname
      var ordersUsersRef = usersRef.child(vm.orderVendorId).child('orders')
      var ordersArray = $firebaseArray(ordersUsersRef)

      var myOrdersRef = usersRef.child(user.$id).child('orders')
      var myOrdersAray = $firebaseArray(myOrdersRef)
      ordersArray.$add(finalOrder)
      .then(function () {
        finalOrder["checked"] = true;
        myOrdersAray.$add(finalOrder)
        var toastContent = '<i style="color: green;" class="fa fa-check-circle fa-lg" aria-hidden="true"></i> Order sent succsesfully'
        // Display success message
        Materialize.toast(toastContent, 3000)
        // Refresh Page
        $state.go('dashboard.orders', {}, {reload: true});
      })
      .catch(function(error) {
        console.error(error);
      })
    }


  }

  angular
    .module('app')
    .controller('DashboardController', DashboardController)

}())
