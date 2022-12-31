var constraints = {
    audio: false,
    video: { width: 960, height: 1280 }
  };
  navigator.mediaDevices.getUserMedia(constraints)
    .then(success)
    .catch(error);
  
  function success(stream) {
    var video = document.getElementById('video');
    video.srcObject = stream;
  }
  
  function error(error) {
    console.log(error);
  }

var canvas = document.getElementById('canvas');
canvas.width = 64;
canvas.height = 48;
var context = canvas.getContext('2d');

setInterval(capture, 100);

function capture() {
  context.drawImage(video, 0, 0, 64, 48);
  let a = context.getImageData(0,0,64,48);
  //console.log(a.data);

  // do other stuff
}