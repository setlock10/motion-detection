let capture;
let ctx;
let w = 96;
let h = 128;
var prevFrame = [];
var c;
var diff;



function setup() {
    //frameRate(10);
    ctx = createCanvas(w, h);
    capture = createCapture(VIDEO);
    capture.size(w, h);
    capture.hide();
    ctx.style('scale','1000%');
    ctx.position(460,600)
    //capture.scale(-1,1)
    //noLoop();
}

function draw(){
    
    //diff.updatePixels();
    //console.log(prevFrame)
    c = capture.get(0,0,w,h);
    
    setInterval(createDiff, 150, c);
    






    push();
    translate(width,0);
    scale(-1, 1);
    image(diff, 0, 0);
    pop();

  }

  function createDiff(c){
    
    diff = createImage(w,h);
    c.loadPixels();
    
    if (prevFrame.length > 0){
        for (let i = 0; i < prevFrame.length; i++){
            // if (i % 4 === 0) diff.data[i] = Math.abs(a.data[i] - prevFrame[i]);
            // if (i % 4 === 1) diff.data[i] = Math.abs(a.data[i] - prevFrame[i]);
            // if (i % 4 === 2) diff.data[i] = Math.abs(a.data[i] - prevFrame[i]);
            if (i % 4 === 0) diff.pixels[i] = 255-(2*(Math.abs(c.pixels[i] - prevFrame[i])));
            if (i % 4 === 1) diff.pixels[i] = 255-(2*(Math.abs(c.pixels[i] - prevFrame[i])));
            if (i % 4 === 2) diff.pixels[i] = 255;
            if (i % 4 === 3) diff.pixels[i] = 255;
        }
    }
    //console.log(diff)
    
    prevFrame = c.pixels;
  
  }