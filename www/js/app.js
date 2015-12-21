// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',

  })
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('confirm', {
    url: '/confirm',
    templateUrl: 'templates/confirm.html',
    controller: 'ConfirmCtrl'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl'
  })
  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('app.lahan', {
    url: '/lahan',
    views: {
      'menuContent': {
        templateUrl: 'templates/lahan.html',
        controller: 'LahanCtrl'
      }
    }
  })

  .state('app.penanaman', {
    url: '/penanaman/:index',
    views: {
      'menuContent': {
        templateUrl: 'templates/tambahlahan.html',
        controller: 'PenanamanCtrl'
      }
    }
  })

  .state('app.detail', {
    url: '/detail/:index',
    views: {
      'menuContent': {
        templateUrl: 'templates/jadwal.html',
        controller: 'DetailCtrl'
      }
    }
  })

  .state('app.akun', {
    url: '/akun',
    views: {
      'menuContent': {
        templateUrl: 'templates/akun.html',
        controller: 'AkunCtrl'
      }
    }
  })

  .state('app.tambah', {
    url: '/tambah',
    views: {
      'menuContent': {
        templateUrl: 'templates/tambah.html',
        controller: 'TambahCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
