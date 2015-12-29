// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ticket.services'])

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

    .state('ticket', {
    url: '/ticket',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('ticket.waitView', {
    url: '/wait',
    views: {
      'menuContent': {
        templateUrl: 'templates/wait.html',
        controller: 'waitCtrl'
      }
    }
  })

  .state('ticket.hauler', {
      url: '/hauler',
      views: {
        'menuContent': {
          templateUrl: 'templates/hauler.html',
          controller: 'haulerCtrl'
        }
      }
    })
    .state('ticket.truckCode', {
      url: '/truckCode',
      views: {
        'menuContent': {
          templateUrl: 'templates/truckCode.html',
          controller: 'truckCodeCtrl'
        }
      }
    })

    .state('ticket.water', {
      url: '/water',
      views: {
        'menuContent': {
          templateUrl: 'templates/water.html',
          controller: 'waterCtrl'
        }
      }
    })

    .state('ticket.finalize', {
      url: '/finalize',
      views: {
        'menuContent': {
          templateUrl: 'templates/finalize.html',
          controller: 'finalizeCtrl'
        }
      }
    })

  .state('ticket.ticket', {
    url: '/playlists',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/ticket/truckCode');
});
