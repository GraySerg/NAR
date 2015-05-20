(function () {
    angular.module("sportsStore", ["customFilters", "cart", "ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider.when("/checkout", {
            templateUrl: "/views/checkoutSummary.html"
        });
        $routeProvider.when("/products", {
            templateUrl: "/views/productList.html"
        });
        $routeProvider.otherwise({
            templateUrl: "/views/productList.html"
        });
        $routeProvider.when("/complete", {
            templateUrl: "/views/thankYou.html"
        });
        $routeProvider.when("/placeorder", {
            templateUrl: "/views/placeOrder.html"
        });
    });
    var sportStoreController = angular.module("sportsStore")
        .constant("dataUrl", "http://localhost:2403/products")
        .controller("sportStoreController", function ($scope, $http, dataUrl) {
            $scope.data = {};
            $http.get(dataUrl).success(function (data) {
                $scope.data.products = data;
            }).error(function(error)
            {
                $scope.data.error = error;
            });
    })
    }());
