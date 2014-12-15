var myApp = angular.module('myApp', []);

myApp.controller('BodyController', ['$scope', '$http',
    function($scope, $http)
    {
        $http.get('/fieldsets.json').success(function(data) {
            $scope.fieldsets = data;
        });
    }
]);
