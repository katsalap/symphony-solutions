angular.module("MyApp", ['ngResource'])
.controller("PostsCtrl", function($scope, $http, $timeout) {
        var mapOptions = {
            zoom: 6,
            center: new google.maps.LatLng(48.5000, 31.50000),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        }
        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        $scope.markers = [];
        $scope.desk=[];
        var infoWindow = new google.maps.InfoWindow();
        var createMarker = function (info){

            var marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.Latitude, info.Longtitude),
                title: info.Title
            });
            google.maps.event.addListener(marker, 'click', function(){
                $scope.showDesc(info.Id);
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + $scope.desk[info.Id] );
               infoWindow.open($scope.map, marker);
            });
            $scope.markers.push(marker);

        }



        $http.get('http://ecomap.org/api/problems/').success(function(data) {
        $scope.posts = data;
            for (i = 0; i < $scope.posts.length; i++){
                createMarker($scope.posts[i]);
            }



        })
        $scope.showDesc = function (id){
        var message = $http.get('http://ecomap.org/api/problems/'+id).success(function(data) {
        $scope.infa = data;
        console.log ($scope.infa[0][0].Content);
        $scope.desk[$scope.infa[0][0].Id]='<div class="infoWindowContent">' + $scope.infa[0][0].Content + '</div>';
            console.log($scope.desk[$scope.infa[0][0].Id]);

});

            return message}
        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger($scope.markers[selectedMarker], 'click');
        }

    });