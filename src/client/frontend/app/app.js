angular.module('app',['view','ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');  

    $stateProvider
      .state('home',{
          url:'/',
          templateUrl:'./frontend/view/partials/mainContent.html'
      })

      .state('showCommerce',{
          url:'/showCommerce',
          templateUrl:'./frontend/view/partials/adherCommerce.html'
      })
      .state('login',{
          url:'/login',
          templateUrl:'./frontend/view/partials/mainUniv.html'
      })
      .state('addCommerce',{
          url:'/addCommerce',
          templateUrl:'./frontend/view/partials/addCommerce.html'
      })
      
  }])




//Script para el banner
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
