let capture;
let ctx;
let w = 96;
let h = 128;
let sampleSize = 10;
let prevFrame = [];
let prevFrame2 = [];
let old = [];
let threshold = 30;
let scalefactor = 1;

function setup() {
  //ctx = createCanvas(w, h);
  capture = createCapture(VIDEO);
  //capture.size(w, h);
  //capture.hide();
  //ctx.style('scale','400%');
  //ctx.position(200,200)
  //capture.scale(-1,1)
  capture.style('scale','200%')
  //noLoop();
  frameRate(5);
}
function draw(){
    
    //diff.updatePixels();
    //console.log(prevFrame)
   // ctx.drawImage(VIDEO, 0,0,w,h)
    // c = capture.get(0,0,w,h);
 
    // push();
    // translate(width,0);
    // scale(-1, 1);
    // image(c, 0, 0);
    // pop();
}