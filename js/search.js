angular.module("MyApp", ['ngResource'])
    .controller("PostsCtrl", function($scope, $http, $timeout) {
        var mapOptions = {
            zoom: 6,
            center: new google.maps.LatLng(48.9000, 31.50000),
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
                if (!$scope.desk[info.Id]){
                $http.get('http://ecomap.org/api/problems/'+info.Id).success(function(data,status) {
                if (status==200) {
                    $scope.infa = data;
                    infoWindow.setContent('<h2>' + marker.title + '</h2>' + '<div class="infoWindowContent">' + $scope.infa[0][0].Content + '<hr />' + $scope.infa[0][0].Proposal + '</div>');
                    $scope.desk[info.Id]=1;
                }
            })}infoWindow.open($scope.map, marker);
            });
            $scope.markers.push(marker);
        }
        $http.get('http://ecomap.org/api/problems/').success(function(data) {
            $scope.posts = data;
            for (i = 0; i < $scope.posts.length; i++){
                createMarker($scope.posts[i]);
            }
        })
        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger($scope.markers[selectedMarker], 'click');
        }
    });