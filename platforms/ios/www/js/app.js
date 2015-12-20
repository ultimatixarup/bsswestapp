// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngCordova', 'starter.controllers','starter.camera.controllers'])

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
                          
                         // $scope.register();
                          
                          
                          });
     })

.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
        .state('app', {
               url: '/app',
               abstract: true,
               templateUrl: 'templates/menu.html',
               controller: 'AppCtrl'
               })
        
        .state('app.home', {
               url: '/home',
               views: {
               'menuContent': {
               templateUrl: 'templates/home.html',
               reload: true
               
               }
               }
               })
        
        .state('app.register', {
               url: '/register',
               views: {
               'menuContent': {
               templateUrl: 'templates/searchRecipt.html',
               reload: true
               
               }
               }
               })
        
        .state('app.camera', {
               url: '/camera',
               views: {
               'menuContent': {
               templateUrl: 'templates/cam.html'
               
               }
               }
               })
        
        .state('app.member_edit', {
               url: '/member_edit',
               views: {
               'menuContent': {
               templateUrl: 'templates/member_edit.html'
               
               }
               }
              
               })
        
        .state('app.reset', {
               url: '/reset',
               views: {
               'menuContent': {
               templateUrl: 'templates/reset.html'
               
               }
               }
               
               })
        
        
        
        .state('app.donate', {
               url: '/donate',
               views: {
               'menuContent': {
               templateUrl: 'templates/donate.html'
               }
               }
               })
        
        .state('app.schedule', {
               url: '/schedule',
               views: {
               'menuContent': {
               templateUrl: 'templates/schedule.html'
               }
               }
               })
        .state('app.album', {
               url: '/album',
               views: {
               'menuContent': {
               templateUrl: 'templates/album.html'
               }
               }
               })
        .state('app.faq', {
               url: '/faq',
               views: {
               'menuContent': {
               templateUrl: 'templates/faq.html'
               }
               }
               })
        .state('app.organization', {
               url: '/organization',
               views: {
               'menuContent': {
               templateUrl: 'templates/organization.html'
               }
               }
               })
        .state('app.activities', {
               url: '/activities',
               views: {
               'menuContent': {
               templateUrl: 'templates/activities.html'
               }
               }
               })
        .state('app.video_album', {
               url: '/video_album',
               views: {
               'menuContent': {
               templateUrl: 'templates/video_album.html'
               }
               }
               })

                
        
        
        
        
        .state('app.playlists', {
               url: '/playlists',
               views: {
               'menuContent': {
               templateUrl: 'templates/playlists.html',
               controller: 'PlaylistsCtrl'
               }
               }
               })
        
        .state('app.single', {
               url: '/playlists/:playlistId',
               views: {
               'menuContent': {
               templateUrl: 'templates/playlist.html',
               controller: 'PlaylistCtrl'
               }
               }
               });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/home');
        });
