var s3Uploader = (function () {
                  
                  var state;
                  var scopeG;
                 
                  
   var uploadURI = "http://www.bsswest.org/bssmobile/upload.php";
                  
                  var win = function(r) {
                  console.log("Code = " + r.responseCode);
                  console.log("Response = " + r.response);
                  console.log("Sent = " + r.bytesSent);
                  scopeG.showMessage("Photo uploaded successfully<br/>Waiting for approval.");
                  
                  state.go('app.album');
                  }
                  
                  var fail = function(error) {
                  alert("error:"+error.response);
                  }

    function upload(imageURI, fileName,astate,scope) {
                  state = astate;
                  scopeG=scope;
                  var options = new FileUploadOptions();
                  options.fileKey="file";
                  options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
                  options.mimeType="image/jpeg";
                  
                  var params = new Object();
                  params.value1 = "test";
                  params.value2 = "param";
                  
                  options.params = params;
                  options.chunkedMode = false;
                  
                  var ft = new FileTransfer();
                  
                  ft.onprogress = function(progressEvent) {
                  if (progressEvent.lengthComputable) {
                    var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                     document.getElementById("ft-prog").value = perc;
                  }
                  }
                 

        ft.upload(imageURI, uploadURI, win, fail, options);

        return;

    }

    return {
        upload: upload
    }

}());