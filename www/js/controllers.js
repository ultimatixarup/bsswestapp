angular.module('starter.controllers', [])


.controller('DonationCtrl', function($scope,$state, $ionicModal, $timeout,$ionicActionSheet,$http,$cordovaPush,$cordovaToast,$cordovaProgress,$rootScope) {

            $scope.closeLogin = function(){
            $state.go('app.home');
            }

            
            //alert(JSON.stringify($rootScope.loginData));
            $scope.loginData = $rootScope.loginData;
            
            //alert($stateParams.myParam);
            window.localStorage['control_number'] = $rootScope.loginData.ControlNumber;
            
            /*
             * if given group is the selected group, deselect it
             * else, select the given group
             */
            $scope.toggleGroup = function(group) {
            if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
            } else {
            $scope.shownGroup = group;
            }
            };
            $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
            };
            

            
            
            })




.controller('AppCtrl', function($scope,$state, $ionicModal, $timeout,$ionicActionSheet,$http,$cordovaPush,
                                $cordovaToast,$cordovaProgress,$rootScope) {
            
            
            $scope.loadFAQ = function(){
            
                document.getElementById("content").innerHTML='<object type="text/html" height="100%" width="100%" data="http://bsswest.org/project/faq.html" ></object>';
            }
            
            $scope.loadVideo = function(){
            
            
            $http.get('http://www.bsswest.org/bssmobile/video_album.php').then(function(resp) {
                                                                                                   //$scope.news = resp.data;
                        $scope.videos = resp.data;
                                                                                                   
                                                                               
            });
                                                                                                   
            $scope.apply();
            
                                                                               
            }
            
            $scope.launchVideo = function(url){
            
            window.open(url,'_system', 'location=yes');
            }
            
            
            
            $scope.resetData = function(){
            window.localStorage['control_number'] = "";
            }
            
            $scope.closeLogin = function(){
            $state.go('app.home');
            }
            
            
            // notification code
            $scope.notifications = [];
            
            $scope.alreadyRegistered = false;
            
                       
            // Register
            $scope.register = function () {
            //alert("registering");
        
            var config = null;
            
            
            if (ionic.Platform.isAndroid()) {
            config = {
            "senderID": "683361679572" // REPLACE THIS WITH YOURS FROM GCM CONSOLE - also in the project URL like: https://console.developers.google.com/project/434205989073
            };
            }
            else if (ionic.Platform.isIOS()) {
            
            config = {
            "badge": "true",
            "sound": "true",
            "alert": "true"
            }
            }
            
            if(! $scope.alreadyRegistered)
            
            $cordovaPush.register(config).then(function (result) {
                                              //alert("Register success " + result);
                                               $scope.alreadyRegistered = true;
                                               $http.get('http://www.bsswest.org/bssmobile/store_token.php?token='+result).then(function(resp) {});
                                               
                                               
                                               
                                            }, function (err) {
                                            //alert("Register error " + err);
                                               $scope.alreadyRegistered = true;
                                               });
            };
            
            // Notification Received
            $scope.$on('$cordovaPush:notificationReceived', function (event, notification) {
                       alert(JSON.stringify([notification]));
            });
            
            $scope.loadNews = function(){
            
            
            
            $http.get('http://www.bsswest.org/bssmobile/news_test.php?control=UPCOMING_EVENT').then(function(resp) {


                                                                             $scope.news = resp.data;
                                                                             $scope.register();
                                                                        
                                                                        });
            
            };
            
            
            $scope.showAction = function(){
            
            $ionicActionSheet.show({
                                   titleText: 'ActionSheet Example',
                                   buttons: [
                                             { text: '<i class="icon ion-share"></i> Share' },
                                             { text: '<i class="icon ion-arrow-move"></i> Move' },
                                             ],
                                   destructiveText: 'Delete',
                                   cancelText: 'Cancel',
                                   cancel: function() {
                                   console.log('CANCELLED');
                                   },
                                   buttonClicked: function(index) {
                                   console.log('BUTTON CLICKED', index);
                                   return true;
                                   },
                                   destructiveButtonClicked: function() {
                                   console.log('DESTRUCT');
                                   return true;
                                   }
                                   });
                };


  $scope.loginData = {};
            
            
            
//            $scope.loginData.first = 'deep';
//            $scope.loginData.last = 'ghosh';
//            $scope.loginData.zip = '92620';
//            $scope.loginData.rcptnumber = '1999';
var member_service_url = 'http://members.bsswest.org/app/api.aspx/';
            $scope.receiptLoad = function(){
            var controlNumber = window.localStorage['control_number'];
            
            if(controlNumber !=null && controlNumber.length > 0){
            
            $cordovaProgress.showSimple(true);
            $http.get(member_service_url + 'get/' + controlNumber).then(function(resp) {
                                                                                                                                                                       $cordovaProgress.hide();
                                                                                                                                                                       
                                                                                                                                                                       
                                                                                                                                                                       //alert(resp.data);
                                                                                                                                                                       var respjson =
                                                                                                                                                                       JSON.parse(resp.data.replace('</asp:Content>',''));
                                                                                                                                                                       
                                                                                                                                                                       //alert(respjson);
                                                                                                                                                                       $rootScope.loginData= respjson;
                                                                                                                                                                       $state.go('app.member_edit',{myparam : respjson});
                                                                                                                                                                       });
            
            }
            }
            
            
  $scope.doLogin = function() {
            $cordovaProgress.showSimple(true)
            $http.get(member_service_url + 'search/' + $scope.loginData.first +'/' + $scope.loginData.last + '/' + $scope.loginData.zip + '/' + $scope.loginData.rcptnumber ).then(function(resp) {
                                                                                                                                                                       $cordovaProgress.hide();
                                                                                                                                                                       
                                                                                                                                                                       
                                                                                                                                                                       //alert(resp.data);
                                                                                                                                                                    var respjson =
                                                                                                                                                                       JSON.parse(resp.data.replace('</asp:Content>',''));
                                                                                                                                                                       
                                                                                                                                                                       //alert(respjson);
                                                                                                                                                                       $rootScope.loginData= respjson;
                                                                                                                                                                       $state.go('app.member_edit',{myparam : respjson});
                                                                                                                                                                       });
            
            }
            
            


})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})



.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('SlideController', function($scope) {
            
            $scope.myActiveSlide = 1;
            
            })

.controller('listCtlr', function($scope,$http) {
            
            
            
           $http.get('http://www.bsswest.org/bssmobile/members.php').then(function(resp) {
                                var orgMembers = resp.data;
                                var orgs = ["BOARD OF TRUSTEES","WORKING COMMITTEE","ADVISORY BOARD"];
                                $scope.groups = [];
                                                                                                   
                                for (var i=0; i<3; i++) {
                                        $scope.groups[i] = {
                                        name: orgs[i],
                                        items: []
                                        };
                                   for (var j=0; j<3; j++) {
                                      $scope.groups[i].items= orgMembers[j];
                                    }
                                }
                            });
            
                        
            /*
             * if given group is the selected group, deselect it
             * else, select the given group
             */
            $scope.toggleGroup = function(group) {
            if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
            } else {
            $scope.shownGroup = group;
            }
            };
            $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
            };
            
            })




.controller('listCtlr_schedule', function($scope,$http,$cordovaCalendar) {
            var schedules;
            
            
            $scope.addtoCalendar = function(item){
            var event = item;
           
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
            
            
            
            var title = event[3];
            var location = "BSS West - 5600 Carbon Canyon st, Brea, CA 92823";
            var notes = "You, your family and friends are invited to this event.";
            var startDate = new Date(new Date().getFullYear(),months.indexOf(event[1]),event[2],10,0,0,0,0);
             var endDate = new Date(new Date().getFullYear(),months.indexOf(event[1]),event[2],20,0,0,0,0);
            
            
            $cordovaCalendar.createEvent({
                                         title: title,
                                         location: location,
                                         notes: notes,
                                         startDate : startDate,
                                         endDate : endDate
                                         }).then(function (result) {
                                                 // success
                                                 //alert("success"+result);
                                                 }, function (err) {
                                                 // error
                                                 alert("error"+err);
                                                 });
            
            }
            
            $scope.loadSchedule = function(){
            
            $http.get('http://www.bsswest.org/bssmobile/news_test.php?control=SCHEDULE_LIST').then(function(resp) {
                                                                        //$scope.news = resp.data;
                                                                        schedules = resp.data;
                                                                                                   
                                                                        
                                                                       
                                                                                                   
           
            $scope.bssschedules = [];
            
            for (var i=0; i<schedules.length; i++) {
            
            $scope.bssschedules[i] = {
            name: schedules[i].indexOf("|") > 0? schedules[i].split("|")[0] : schedules[i],
            bssschedulesitems: [" "]
            };
            for (var j=0; j<schedules.length; j++){
                $scope.bssschedules[i].bssschedulesitems[0] = schedules[i].indexOf("|") > 0? schedules[i].split("|")[1] : "Puja starts at 6 PM";
                                                                                                   }

            
            
            }
                                                                                                   
                       
            /*
             * if given group is the selected group, deselect it
             * else, select the given group
             */
            $scope.toggleGroup = function(bssschedule) {
            if ($scope.isGroupShown(bssschedule)) {
            $scope.shownGroup = null;
            } else {
            $scope.shownGroup = bssschedule;
            }
            };
            $scope.isGroupShown = function(bssschedule) {
            return $scope.shownGroup === bssschedule;
            };
             });
            };
            
        })


.controller("AlbumCtlr", function($scope,$http,$ionicModal,$stateParams) {
            
            $scope.images = [];
            
            $scope.refreshImages = function(){
            //aler("refresh");
            $scope.images = [];
            $http.get('http://www.bsswest.org/bssmobile/listfiles.php').then(function(resp) {
                                                                           
                                                                             console.log('Success', resp);
                                                                             resp.data.reverse();
                                                                             // For JSON responses, resp.data contains the result
                                                                             for(var i = 0; i < resp.data.length; i++) {
                                                                             $scope.images.push({id: i, src: "http://www.bsswest.org/bssmobile/uploads/thumbs/"+resp.data[i],origsrc: "http://www.bsswest.org/bssmobile/uploads/"+resp.data[i]});
                                                                             }
                                                                             
                                                                             }, function(err) {
                                                                             console.error('ERR', err);
                                                                             // err.status will contain the status code
                                                                             alert("error"+err);
                                                                             })

            
            }
            
            
            $scope.loadImages = function() {
            
            if($scope.images.length == 0){
             //alert($scope.images.length);
            $scope.refreshImages();
            }
            
            }
            
            
            $ionicModal.fromTemplateUrl('image-modal.html', {
                                        scope: $scope,
                                        animation: 'slide-in-up'
                                        }).then(function(modal) {
                                                $scope.modal = modal;
                                                });
            
            $scope.openModal = function() {
            $scope.modal.show();
            };
            
            $scope.closeModal = function() {
            $scope.modal.hide();
            };
            
            //Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function() {
                       $scope.modal.remove();
                       });
            // Execute action on hide modal
            $scope.$on('modal.hide', function() {
                       // Execute action
                       });
            // Execute action on remove modal
            $scope.$on('modal.removed', function() {
                       // Execute action
                       });
            $scope.$on('modal.shown', function() {
                       console.log('Modal is shown!');
                       });
            
            $scope.showImage = function(imagesource) {
            //alert(imagesource);
            $scope.imageSrc = imagesource;
            
              $scope.openModal();
            };
            
           // $scope.imageSrc = 'http://ionicframework.com/img/ionic-logo-blog.png';
//
//            $scope.showImage = function(index) {
//            switch(index) {
//            case 1:
//            $scope.imageSrc = 'http://ionicframework.com/img/ionic-logo-blog.png';
//            break;
//            case 2:
//            $scope.imageSrc  = 'http://ionicframework.com/img/ionic_logo.svg';
//            break;
//            case 3:
//            $scope.imageSrc  = 'http://ionicframework.com/img/homepage/phones-weather-demo@2x.png';
//            break;
//            }
//            $scope.openModal();
//            }
            
            
            
            });





