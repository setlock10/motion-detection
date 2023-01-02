let capture;
let diff;
let ctx;
let c;
let w = 96;
let h = 128;
let sampleSize = 10;
let prevFrame = [];
let prevFrame2 = [];
let old = [];
let threshold = 30;
let scalefactor = 1;

function setup() {
  ctx = createCanvas(w, h);
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.hide();
  ctx.style('scale','1000%');
  ctx.position(440,580)
  //capture.scale(-1,1)
  capture.style('scale','200%')
  //noLoop();
  frameRate(5);
}
function draw(){
    
    //diff.updatePixels();
    c = capture.get(0,0,w,h);
    // diff = createImage(w,h);
    diff = capture.get(0,0,w,h);
    //console.log(prevFrame)
   // ctx.drawImage(VIDEO, 0,0,w,h)
    c.loadPixels();
    diff.loadPixels();
    if (prevFrame.length > 0){
        for (let i = 0; i < prevFrame.length; i++){
            // if (i % 4 === 0) diff.data[i] = Math.abs(a.data[i] - prevFrame[i]);
            // if (i % 4 === 1) diff.data[i] = Math.abs(a.data[i] - prevFrame[i]);
            // if (i % 4 === 2) diff.data[i] = Math.abs(a.data[i] - prevFrame[i]);
            if (i % 4 === 0) diff.pixels[i] = 255-(2*(Math.abs(c.pixels[i] - prevFrame[i])));
            if (i % 4 === 1) diff.pixels[i] = 255-(2*(Math.abs(c.pixels[i] - prevFrame[i])));
            if (i % 4 === 2) diff.pixels[i] = 255;
            if (i % 4 === 3) diff.pixels[i] = 255;
           //c.pixels[i]=0;
        }
    }
    //console.log(diff)
    // for (let i = 0; i < c.pixels.length; i++){
    //     if (i % 4 === 0) c.pixels[i] = 0;
        
        
    // }
    // diff.updatePixels();
    prevFrame = c.pixels;
   //c.imageData= diff.data;
   c.updatePixels();
   diff.updatePixels();
   //console.log(c.pixels)  
 
    // push();
     translate(width,0);
     scale(-1, 1);
     image(diff, 0, 0);
    // pop();
}