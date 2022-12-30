let capture;
let ctx;
let w = 320;
let h = 240;
let sampleSize = 10;

function setup() {
  ctx = createCanvas(w, h);
  capture = createCapture(VIDEO);
  capture.size(w, h);
  capture.hide();
  //capture.scale(-1,1)
  //noLoop();
}

function draw() {
    //var data = ctx.getImageData(0,0,320,240)
    //console.log(capture.image)
    //scale(-1,1);
  //background(255);
  //image(capture, 0, 0, 320, 240);
  //filter(INVERT);
//   push();
//   translate(width,0);
//   scale(-1, 1);
//   image(capture, 0, 0, 320, 240);
//   pop();
    let c = capture.get(0,0,w,h);
    c.loadPixels();
    //c.pixels = pixelate(c.pixels);
    for (let y = 0; y < h; y+= 1){
        for (let x = 0; x < w; x+= 1){
            let pos = (x + y * w) * 4;
            let pixX = Math.floor(x/sampleSize) * sampleSize;
            let pixY = Math.floor(y/sampleSize) * sampleSize;
            let pixPos= (pixX + pixY * w) * 4
            //let pixPos = ((Math.floor(x/sampleSize) * sampleSize ))
            c.pixels[pos] = 0;
            c.pixels[pos+1] = 0;
            c.pixels[pos+2] = c.pixels[pixPos+2];
           
        }
    }
    c.updatePixels();
   // console.log(c)
    push();
    translate(width,0);
    scale(-1, 1);
    image(c, 0, 0);
    pop();

}

function pixelate(data){
    for (let y = 0; y < h; y+= sampleSize){
        for (let x = 0; x < w; x+= sampleSize){
            let pos = (x + y * w) * 4;
            //let r = data[pos];
            //let g = data[pos+1];
            //let b = data[pos+2];
            data[pos];
            data[pos+1] = 0;
            data[pos+2] = 0;
            //ctx.fillStyle = rgb(r, g, b);
            //ctx.fillRect(x, y, sampleSize, sampleSize)

        }
    }



    return data;


}
