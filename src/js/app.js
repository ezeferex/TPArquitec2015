var app=angular.module('starterApp', [ 'ngMaterial' ]);
app.controller('AppCtrl', ['$scope','$mdSidenav', function ($scope,$mdSidenav) {
    $scope.toogleSideNav=function(menuId){
        $mdSidenav(menuId).toggle()
   .then(function(){});
  	$scope.signUp=function(){
  		
  	}
    };
}]);