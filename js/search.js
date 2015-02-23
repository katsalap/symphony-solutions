angular.module('TestApp', [])
    .controller("TestCtrl", function ($scope,$http) {
        $scope.lol = "thtas";
        $http({method: 'POST', url: 'http://ecomap.org/api/problems'}).success(function(data)
        {
            $scope.posts = data; // response data
        });


})