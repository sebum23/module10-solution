describe('menucategories', function () {

  var menucategories;
  var $httpBackend;
  var ApiPath;

  beforeEach(function () {
    module('common');

    inject(function ($injector) {
      menucategories = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');
    });
  });

  it('should return menu item A1', function() {
    $httpBackend.whenGET(ApiPath + '/menu_items/A/menu_items/0.json').respond(
      {
        "description": "chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions",
        "large_portion_name": "quart",
        "name": "Won Ton Soup with Chicken",
        "price_large": 5,
        "price_small": 2.55,
        "short_name": "A1",
        "small_portion_name": "pint"
    }
    );
    menucategories.getMenuItem('A', '0').then(function(response) {
      expect(response).toEqual(
        {
          "description": "chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions",
          "large_portion_name": "quart",
          "name": "Won Ton Soup with Chicken",
          "price_large": 5,
          "price_small": 2.55,
          "short_name": "A1",
          "small_portion_name": "pint"
      }
      );
    });
    $httpBackend.flush();
  });

});
