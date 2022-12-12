(function () {
  "use strict";
  
  angular.module('public')
  .controller('SignUpController', SignUpController);
  
  SignUpController.$inject = ['MenuService', 'UserService'];
  function SignUpController(MenuService, UserService) {
    var $ctrl = this;
    $ctrl.isMenuItemValid = true;

    $ctrl.validateMenuItemForm = function() {
      // we need to have 2 different check to see if the signup form is valid for menu item
      // 1. is empty? 2. is valid menu item?
      if ($ctrl.favoriteMenu && $ctrl.isMenuItemValid) {
        return true;
      }
      return false;
    }

    $ctrl.signup = function() {
      console.log("sign up function called");

      // do not trust data, so validate menu item once again
      var menuItem = $ctrl.favoriteMenu;
      if (menuItem) {
        var [category, number] = menuItem.split(/(\d+)/);
        // api starts with 0, so subtract 1
        number -= 1;
        MenuService.getMenuItem(category.toUpperCase(), number)
        .then(response => {
          console.log(response);
          if (response != null) {
            $ctrl.isMenuItemValid = true;

            var userData = {
              firstName: $ctrl.firstName,
              lastName: $ctrl.lastName,
              email: $ctrl.email,
              phoneNum: $ctrl.phoneNum,
              favoriteMenu: $ctrl.favoriteMenu.toUpperCase()
            };
            UserService.saveUser(userData);
            $ctrl.isRegistered = true;
          } else {
            $ctrl.isMenuItemValid = false;
          }
        })
        .catch(e => {
          console.log('error: ', e.message);
          $ctrl.isMenuItemValid = false;
        })
      }

    }

    $ctrl.validateFavMenuItem = function() {
      var menuItem = $ctrl.favoriteMenu;
      if (menuItem) {
        var [category, number] = menuItem.split(/(\d+)/);
        // api starts with 0, so subtract 1
        number -= 1;
        MenuService.getMenuItem(category.toUpperCase(), number)
        .then(response => {
          console.log(response);
          if (response != null) {
            $ctrl.isMenuItemValid = true;
          } else {
            $ctrl.isMenuItemValid = false;
          }
        })
        .catch(e => {
          console.log('error: ', e.message);
          $ctrl.isMenuItemValid = false;
        })
      }
    }
  }
  
  
  })();
  