angular.module('app', ['ngMaterial'])
  .controller('AppCtrl', ['$scope','$mdSidenav', function ($scope,$mdSidenav,$mdDialog) {

    $scope.toogleSideNav=function(menuId){
        $mdSidenav(menuId).toggle()
   .then(function(){});
    };

    var st = 0;
    var $header = document.getElementById("md-toolbar");
    window.onscroll = function(){
      st = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
      if(st < 100){
        $header.className="";
      } else {
        $header.className='header-scroll';
      }
    }; 



}])
  .controller('dialogController', function ($scope,$mdDialog) {
        $scope.status=' ';
        $scope.logIn=function(ev){
          $mdDialog.show({
            controller:DialogController,
            templateUrl:'../TP/templates/logIn.tmpl.html',
            parent: angular.element(document.body),
            tagetEvent: ev,
            clickOutsideToClose: true
        }).then(function(){});
    };
        $scope.signUp=function(ev){
          $mdDialog.show({
            controller:DialogController,
            templateUrl:'../TP/templates/signUp.tmpl.html',
            parent: angular.element(document.body),
            targetEvent:ev,
            clickOutsideToClose:true
          }).then(function(){});
    };
        $scope.newAccount=function(ev){
          console.log('hola');
        };
  });

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
}


