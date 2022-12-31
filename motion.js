let capture;
let ctx;
let w = 960;
let h = 1280;

function setup() {
    ctx = createCanvas(w, h);
    capture = createCapture(VIDEO);
    capture.size(w, h);
    capture.hide();
    //ctx.style('scale','400%');
    ctx.position(200,200)
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