(function () {

  'use strict';

  function DashboardController($state, $scope, $firebaseObject, $firebaseArray, AuthenticationFactory) {

    var vm = this;

    // Define Authorized user
    var user = AuthenticationFactory.user()

    // Define firebase database References
    const usersRef = firebase.database().ref('users')
    const productsRef = usersRef.child(user.uid).child('products')
    const vendorsRef = usersRef.child(user.uid).child('vendors')
    const myOrdersRef = usersRef.child(user.uid).child('orders')

    // Define firebase Objects and Arrays
    const userObj = $firebaseObject(usersRef.child(user.uid))
    const productsArray = $firebaseArray(productsRef)
    const usersArray = $firebaseArray(usersRef)
    const vendorsArray = $firebaseArray(vendorsRef)
    const myOrdersAray = $firebaseArray(myOrdersRef)


    // vm VARIABLES
    vm.store = userObj
    vm.products = productsArray
    vm.users = usersArray
    vm.myVendors = vendorsArray
    vm.myOrders = myOrdersAray
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
    vm.deleteVendor = deleteVendor

    // INSTANTIADED METHODS

    // DEFINED FUNCTIONS

    // ########### VENDOR PRODUCTS SECTION ###########

    // ADD PRODUCT TO CURRENT USER DATABASE
    function addProduct(product) {
      productsArray.$add(product)
      .then(function (data) {
        // Refresh Page
        $state.go('dashboard.products', {}, { reload: true })
        // Display success message
        onScreenMesage('check-circle', 'Product Added Succesfuly')
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
        // Display success message
        onScreenMesage('check-circle', 'Product Removed Succesfuly')
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
          // Display success message
          onScreenMesage('exclamation-triangle', 'This user is already a favorite', 'yellow')
          return
        }
      }
      vendorsArray.$add(vendor)
      .then(function (data) {
        // Display success message
        onScreenMesage('check-circle', 'Vendor Added to Favorites')
      })
      .catch(function (error) {
        console.error(error);
      })
    }

    // DELETE VENDOR
    function deleteVendor(id) {
      var vendorObject = $firebaseObject(vendorsRef.child(id))
      vendorObject.$remove()
      .then(function (data) {
          // Display success message
          onScreenMesage('check-circle', 'Vendor Removed Succesfuly')
        })
        .catch(function (error) {
          console.error(error);
        })
    }

    // ########### PLACING ORDERS SECTION ###########

    // CHANGE ORDER VENDOR
    function changeVendor() {
      // Loop over my vendors find selected vendor
      for (var i = 0; i < vm.myVendors.length; i++) {
        if (vm.myVendors[i].uid == vm.orderVendorId) {
          // Find current vendor products reference in firebase database
          var currentVendorProductsRef = usersRef.child(vm.orderVendorId).child('products')
          // Create a current vendor products array using firebase reference
          var currentVendorProductsArray = $firebaseArray(currentVendorProductsRef)
          // Assign selected vendor to current vendor
          vm.currentVendor = vm.myVendors[i]
          // Assign selected vendor products to current vendor products
          vm.currentVendorProducts = currentVendorProductsArray
          // Clear order sheet
          vm.orderSheet = []
        }
      }
    }

    // ADD PRODUCTS TO ORDER SHEET
    function addToOrder(product) {
      for (var i = 0; i < vm.orderSheet.length; i++) {
        if (vm.orderSheet[i].$id === product.$id) {
          // Display success message
          onScreenMesage('exclamation-triangle', 'Item Already in order please update quantity', 'yellow', 4000)
          return
        }
      }
      // Assign quantity = 1
      product.quantity = 1
      // Push product into order sheet array
      vm.orderSheet.push(product)
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
    }

    // SEND ORDER TO VENDOR
    function sendOrder() {
      var finalOrder = {}
      for (var i = 0; i < vm.orderSheet.length; i++) {
        finalOrder["item "+ (i+1)] = vm.orderSheet[i]
      }

      var ordersUsersRef = usersRef.child(vm.orderVendorId).child('orders')
      var ordersArray = $firebaseArray(ordersUsersRef)

      var currentVendorUserRef = usersRef.child(vm.orderVendorId)
      var currentVendorObject = $firebaseObject(currentVendorUserRef)

      finalOrder["checked"] = false
      finalOrder["restaurant"] = vm.store.firstname
      finalOrder["vendor"] = vm.currentVendor.firstname

      ordersArray.$add(finalOrder)
      .then(function () {
        myOrdersAray.$add(finalOrder)
        // Display success message
        onScreenMesage('check-circle', 'Order sent succsesfully')
        // Refresh Page
        $state.go('dashboard.orders', {}, {reload: true});
      })
      .catch(function(error) {
        console.error(error);
      })
    }

    // DISPLAY ON SCREEN MESSAGE (using fontawesome icon names)
    function onScreenMesage(icon, message, iconColor = "green", time = 3000) {
      // Define toast HTML content
      var toastContent = '<i style="color: ' + iconColor + ';" class="fa fa-' + icon + ' fa-lg" aria-hidden="true"></i> ' + message
      // Use materialize toast method
      Materialize.toast(toastContent, time)
    }


  }

  angular
    .module('app')
    .controller('DashboardController', DashboardController)

}())
