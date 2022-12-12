(function () {
  "use strict";
  
  angular.module('public')
  .controller('MyInfoController', MyInfoController);
  
  MyInfoController.$inject = ['MenuService', 'UserService'];
  function MyInfoController(MenuService, UserService) {
    var $ctrl = this;

    $ctrl.isUserFound = UserService.isUserAvailable();

    if ($ctrl.isUserFound) {
      $ctrl.user = UserService.getUserInfo();

      // get fav menu item data
      var menuItem = $ctrl.user.favoriteMenu;
      if (menuItem) {
        var [category, number] = menuItem.split(/(\d+)/);
        // api starts with 0, so subtract 1
        number -= 1;
        MenuService.getMenuItem(category.toUpperCase(), number)
        .then(response => {
          console.log(response);
          if (response != null) {
            $ctrl.user.menuItem = response;
            $ctrl.categoryShortName = category.toUpperCase();
          } else {
            $ctrl.user.menuItem = null;
          }
        })
        .catch(e => {
          console.log('error: ', e.message);
          $ctrl.user.menuItem = null;
        })
      }

    }
  }
  
  
  })();
  