(function () {
    angular.module("sportsStore", ["customFilters"]);
    var sportStoreController = angular.module("sportsStore")
        .constant("dataUrl", "http://localhost:2403/products")
        .controller("sportStoreController", function ($scope, $http, dataUrl) {
            $scope.data = {};
            $http.get(dataUrl).success(function (data) {
                $scope.data.products = data;
            });
    })
    }());
