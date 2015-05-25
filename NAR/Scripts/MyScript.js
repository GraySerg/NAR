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
        .constant("orderUrl", "http://localhost:2403/orders")
        .controller("sportStoreController", function ($scope, $http, $location, dataUrl, orderUrl,cart) {
            $scope.data = {};
            $http.get(dataUrl).then(onSuccess, onError);
            function onSuccess(response) {
                $scope.data.products = response.data;
            };
            function onError(error) {
                $scope.data.error = error;
            };
            $scope.sendOrder = function (shippingDetails) {
                var order = angular.copy(shippingDetails);
                order.products = cart.getProducts();
                $http.post(orderUrl, order)
                .success(function (data) {
                    $scope.data.orderId = data.id;
                    cart.getProducts().length = 0;
                })
                .error(function (error) {
                    $scope.data.orderError = error;
                }).finally(function () {
                    $location.path("/complete");
                });
            }
        });

    }());