(function () {
  "use strict";
  
  angular.module('common')
  .service('UserService', UserService);

  function UserService() {
    var service = this;
    var user;
  
    service.saveUser = function (userInfo) {
      user = userInfo;
    };

    service.isUserAvailable = function() {
      if (user) {
        return true;
      }
      return false;
    }

    service.getUserInfo = function() {
      return user;
    }
  
  }
})();
  