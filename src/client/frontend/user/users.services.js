angular.module('users',['ngAnimate', 'ngAria','ngMaterial'])
      .run(function($rootScope){
          $rootScope.userType='';//Tipo de Usuario ninguno
          $rootScope.countCommerces='';
      })


      .factory('commerceList', function ($http) {
          return {
          getCommerceList:function(){
              $http.get('/home')
              .success(function(data){
                console.log(data);
                return data;
              })
            .error(function (err){
              console.log(err);
          })
        }
            }
        })

	    .factory('auth', function($http,$location,$mdDialog,$rootScope){
      return{
        registerCommerce:function(registerData){
        $http.post("/newCommerce", registerData)
            .success(function(data,alertsForm){
              //alertsForm.alertRegister();//Alert de registrado
              alert = $mdDialog.alert()
              .title('Usuario registrado')
              .content('Comercio registrado exitosamente')
              .ok('Close');

            $mdDialog
                .show( alert )
                .finally(function() {
                  alert = undefined;
                });
              
            })
            .error(function(err,alertsForm){
              //alertsForm.alertErrRegister();//Error al agregar
              //console.log('Hola');
              alert = $mdDialog.alert()
                .title('Error')
                .content('El comercio no se pudo registrar')
                .ok('Close');

            $mdDialog
                .show( alert )
                .finally(function() {
                  alert = undefined;
                });
            });
        },

        register:function(registerData){
          $http.post("/register", registerData)
            .success(function(data,alertsForm){
              //alertsForm.alertRegister();//Alert de registrado
              
            })
            .error(function(err,alertsForm){
              //alertsForm.alertErrRegister();//Error al agregar
            });
        },

        login:function(loginData){
          $http.post("/login",loginData)
            .success(function(data){
              $location.path( "/login" );//Cambiar de estado(UI-router)
              $rootScope.userType='Admin';
            })
            .error(function(err,alertsForm){
              //alertsForm.alertErrLogin();//Algo esta mal
                alert = $mdDialog.alert()
                  .title('Error')
                  .content('El usuario no se pudo loguear')
                  .ok('Close');

            $mdDialog
                .show( alert )
                .finally(function() {
                  alert = undefined;
                });
            });
        }
      }
    })


    .factory('alertsForm', function ($mdDialog) {
      return {
          alertRegister:function(){
            alert = $mdDialog.alert()
              .title('Usuario registrado')
              .content('Usuario registrado exitosamente')
              .ok('Close');

            $mdDialog
                .show( alert )
                .finally(function() {
                  alert = undefined;
                });
          },

          alertErrRegist:function(){
            console.log('Hola');
              alert = $mdDialog.alert()
                .title('Error')
                .content('El usuario no se pudo registrar')
                .ok('Close');

            $mdDialog
                .show( alert )
                .finally(function() {
                  alert = undefined;
                });
          },

          alertErrLogin:function(){
            console.log('Hola');
                alert = $mdDialog.alert()
                  .title('Error')
                  .content('El usuario no se pudo loguear')
                  .ok('Close');

            $mdDialog
                .show( alert )
                .finally(function() {
                  alert = undefined;
                });
          }
      }
    });