angular.module('view', ['users','ngAnimate', 'ngAria','ngMaterial','ngMessages','ngFileUpload'])

    .controller('AppController', function ($scope,$mdSidenav,$mdDialog,$location,$http){

            $http.get('/home')
              .success(function(data){
                console.log(data);
                $scope.commerces=data;
              })
            .error(function (err){
              console.log(err);
            });
        $scope.toogleSideNav=function(menuId){
            $mdSidenav(menuId).toggle()
        .then(function(){});
        };
    })

  .controller('dialogController', function ($scope,$mdDialog) {
        $scope.status=' ';
        $scope.logIn=function(ev){
          $mdDialog.show({
            controller:DialogController,
            templateUrl:'/templates/logIn.tmpl.html',
            parent: angular.element(document.body),
            tagetEvent: ev,
            clickOutsideToClose: true
        }).then(function(){});
    };
        $scope.signUp=function(ev){
          $mdDialog.show({
            controller:DialogController,
            templateUrl:'/templates/signUp.tmpl.html',
            parent: angular.element(document.body),
            targetEvent:ev,
            clickOutsideToClose:true
          }).then(function(){});
    };
  })

  .controller('formController', function ($scope,auth,Upload, $timeout) {
        $scope.signUp=function(regisData){
          //console.log('hola');
          console.log(regisData);
          auth.register(regisData);
        };

        $scope.newCommerce=function(commerce,file){
          //auth.registerCommerce(commerce);//Nuevo comercio
          file.upload = Upload.upload({
          url: '/newCommerce',
          data: {file: file,commerce:commerce},
          });
        }

       /* $scope.uploadPic = function(file) {
        file.upload = Upload.upload({
        url: '/uploadImg',
        data: {file: file},
      });*/
  })

  .controller('adherCommerces', function ($scope,$http) {
            $scope.loadCommerce=function(){
                $http.get('/adherCommerces')
              .success(function(data){
                console.log(hola);
                console.log(data);
                $scope.adhercommerces=data;
              })
            .error(function (err){
              console.log(err);
            });
          }
  })


/*  .controller('logInController', function ($scope,auth) {
        $scope.loginAction=function(user,$mdDialog){
          auth.login(user);
          //Falta cerrar el dialog
        };
  })*/
  
  //Functions para controlar el dialog

function DialogController($scope, $mdDialog,auth) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.loginAction=function(user){
      auth.login(user);
      $mdDialog.cancel();
  }
}