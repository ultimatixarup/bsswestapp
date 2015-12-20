angular.module('starter.camera.controllers', [])

/**
 * A simple example service that returns some data.
 */


.controller('CamCtrl',function($scope,$ionicPopup,$state) {

	
            $scope.showMessage = function(msg){
            //alert("showmessage");
            var alertPopup = $ionicPopup.alert({
                                               title: 'BSS West',
                                               template: msg
                                               });
            alertPopup.then(function(res) {
                            
            });
            };
            
    // init variables
	$scope.data = {};
	$scope.obj;
	var pictureSource;   // picture source
	var destinationType; // sets the format of returned value
	var url;
	
//	// on DeviceReady check if already logged in (in our case CODE saved)
//	ionic.Platform.ready(function() {
//		//console.log("ready get camera types");
//		if (!navigator.camera)
//			{
//			// error handling
//			return;
//			}
//		//pictureSource=navigator.camera.PictureSourceType.PHOTOLIBRARY;
//		pictureSource=navigator.camera.PictureSourceType.CAMERA;
//		destinationType=navigator.camera.DestinationType.FILE_URI;
//		});
	
            
            $scope.getPicture = function() {
           
          
            //console.log("got camera button click");
            pictureSource=navigator.camera.PictureSourceType.PHOTOLIBRARY;
            destinationType=navigator.camera.DestinationType.FILE_URI;
            
            var options =   {
            quality: 50,
            destinationType: destinationType,
            sourceType: pictureSource,
            encodingType: 0
            };
            if (!navigator.camera)
            {
            // error handling
            alert("navigator.camera is false - returning");
            return;
            }
            navigator.camera.getPicture(
                                        
                                        function (imageURI) {
                                        //console.log("got camera success ", imageURI);
                                        $scope.mypicture = imageURI;
                                        
                                        $scope.$apply();
                                        },
                                        function (err) {
                                        //console.log("got camera error ", err);
                                        // error handling camera plugin
                                        alert("error"+err);
                                        },
                                        options);

            };

	
	// take picture
	$scope.takePicture = function() {
		//console.log("got camera button click");
            pictureSource=navigator.camera.PictureSourceType.CAMERA;
            destinationType=navigator.camera.DestinationType.FILE_URI;
            
		var options =   {
			quality: 50,
			destinationType: destinationType,
			sourceType: pictureSource,
			encodingType: 0
			};
		if (!navigator.camera)
			{
			// error handling
                        alert("navigator.camera is false - returning");
			return;
			}
		navigator.camera.getPicture(
                                    
			function (imageURI) {
				//console.log("got camera success ", imageURI);
				$scope.mypicture = imageURI;
                                    
                                    $scope.$apply();
				},
			function (err) {
				//console.log("got camera error ", err);
				// error handling camera plugin
                                    alert("error"+err);
				},
			options);
		};
            
            
            
	// do POST on upload url form by http / html form    
	$scope.upload = function() {
            //alert("inside update"+$scope.mypicture);
            var fileName = "" + (new Date()).getTime() + ".jpg"; // consider a more reliable way to generate unique ids
            s3Uploader.scope = $ionicPopup;
            s3Uploader.upload($scope.mypicture,fileName,$state,$scope);
		
            		};
});

