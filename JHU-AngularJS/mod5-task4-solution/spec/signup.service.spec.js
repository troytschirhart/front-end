describe('signup', function () {

  var signup;
  var $httpBackend;
  var ApiPath;
  var shortName;
  var L1_Json;
  var noSuchNumber;

  beforeEach(function () {
    module('common');

    shortName = "L1";    

    L1_Json = {  "id":193,
         "short_name":"L1",
               "name":"Orange Chicken",
        "description":"chunks of chicken, breaded and deep-fried with sauce containing orange peels; white meat by request: for pint $1 extra, for large $2 extra",
        "price_small":null,
        "price_large":9.75,
 "small_portion_name":null,
 "large_portion_name":null,
         "created_at":"2022-04-24T17:33:53.916Z",
         "updated_at":"2022-04-24T17:33:53.916Z",
"category_short_name":"L",
      "image_present":true};

    noSuchNumber = "Z28";

    inject(function ($injector) {
      signup = $injector.get('SignupService');
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');
    });
  });

  it('should return the favorite item because it exists', function() {
    $httpBackend.whenGET(ApiPath + '/menu_items/' + shortName + '.json').respond(L1_Json);
    signup.getFavoriteItem(shortName).then(function (response) {
      expect(response.name).toEqual("Orange Chicken");
    });
    $httpBackend.flush();
  });

  it('should not return the favorite item because no such menu number exists', function() {
    $httpBackend.whenGET(ApiPath + '/menu_items/' + noSuchNumber + '.json').respond();
    signup.getFavoriteItem(noSuchNumber).then(function (response) {
      expect(response).toEqual(undefined);
    });
    $httpBackend.flush();
  });

});

