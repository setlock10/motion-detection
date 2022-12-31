const diffWidth=96;
const diffHeight=128;
const includeMotionPixels = true;
const pixelDiffThreshold = 32;
const scoreThreshold = 32;
var prevFrame = [];

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
  var diffCanvas = document.createElement('canvas')
  //var diffCanvas = document.getElementById('diff');
  canvas.width = 96;
  canvas.height = 128;
  var context = canvas.getContext('2d');
  var diffContext = diffCanvas.getContext('2d');
  //diffCanvas.width = 96;
  //diffCanvas.height = 128;
 // var diffContext = diffCanvas.getContext('2d');
    
setInterval(capture, 150);

function capture() {
    //context.globalCompositeOperation = 'difference';
    //context.drawImage(video, 0, 0, 64, 48);
    diffContext.drawImage(video, 0, 0, 64, 48);
    
    let a = diffContext.getImageData(0,0,64,48);
    //console.log(a);
    // let diff = a;
    let diff = new ImageData(64,48);
    //console.log(diff)

    if (prevFrame.length > 0){
        for (let i = 0; i < prevFrame.length; i++){
            // if (i % 4 === 0) diff.data[i] = Math.abs(a.data[i] - prevFrame[i]);
            // if (i % 4 === 1) diff.data[i] = Math.abs(a.data[i] - prevFrame[i]);
            // if (i % 4 === 2) diff.data[i] = Math.abs(a.data[i] - prevFrame[i]);
            if (i % 4 === 0) diff.data[i] = 255-(2*(Math.abs(a.data[i] - prevFrame[i])));
            if (i % 4 === 1) diff.data[i] = 255-(2*(Math.abs(a.data[i] - prevFrame[i])));
            if (i % 4 === 2) diff.data[i] = 255;
            if (i % 4 === 3) diff.data[i] = 255;
        }
    }

    //console.log(diff.data[100])  
    //var diffImageData = context.getImageData(0, 0, diffWidth, diffHeight);
    //var diff = processDiff(diffImageData)
     //context.globalCompositeOperation = 'source-over';
    context.putImageData(diff, 0, 0);
    //diff.data=[];
    // do other stuff
    //console.log(diff.data);
    prevFrame = a.data;


}

function processDiff(diffImageData) {
    var rgba = diffImageData.data;

    // pixel adjustments are done by reference directly on diffImageData
    var score = 0;
    var motionPixels = includeMotionPixels ? [] : undefined;
    var motionBox = undefined;
    for (var i = 0; i < rgba.length; i += 4) {
        var pixelDiff = rgba[i] * 0.3 + rgba[i + 1] * 0.6 + rgba[i + 2] * 0.1;
        var normalized = Math.min(255, pixelDiff * (255 / pixelDiffThreshold));
        rgba[i] = 0;
        rgba[i + 1] = normalized;
        rgba[i + 2] = 0;

        if (pixelDiff >= pixelDiffThreshold) {
            score++;
            coords = calculateCoordinates(i / 4);

            if (includeMotionBox) {
                motionBox = calculateMotionBox(motionBox, coords.x, coords.y);
            }

            if (includeMotionPixels) {
                motionPixels = calculateMotionPixels(motionPixels, coords.x, coords.y, pixelDiff);
            }

        }
    }

    return {
        score: score,
        motionBox: score > scoreThreshold ? motionBox : undefined,
        motionPixels: motionPixels
    };
}