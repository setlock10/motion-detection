let capture;
let ctx;
let w = 96;
let h = 128;
var prevFrame = [];

function setup() {
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
    let c = capture.get(0,0,w,h);
    c.loadPixels();
    push();
    translate(width,0);
    scale(-1, 1);
    image(c, 0, 0);
    pop();

  }