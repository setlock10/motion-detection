let capture;
let ctx;
let w = 960;
let h = 1280;
let sampleSize = 15;
let prevFrame = [];
let old = [];
let threshold = 50;
let scalefactor = 1;

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
    c.pixels = pixelate(c.pixels);
    //c.pixels = detect(c.pixels);
    //console.log(prevFrame)
    // for (let y = 0; y < h; y+= 1){
    //     for (let x = 0; x < w; x+= 1){
    //         let pos = (x + y * w) * 4;
    //         let pixX = Math.floor(x/sampleSize) * sampleSize;
    //         let pixY = Math.floor(y/sampleSize) * sampleSize;
    //         let pixPos= (pixX + pixY * w) * 4;
            
    //         c.pixels[pos] = c.pixels[pixPos];
    //         c.pixels[pos+1] = c.pixels[pixPos+1];
    //         c.pixels[pos+2] = c.pixels[pixPos+2];
    //     }
    // }
    c.updatePixels();
   // console.log(c)
    push();
    translate(width,0);
    scale(-1, 1);
    image(c, 0, 0);
    pop();

}

function pixelate(data){
    let result = data;
    for (let y = 0; y < h; y+= 1){
        for (let x = 0; x < w; x+= 1){
            let pos = (x + y * w) * 4;
            let pixX = Math.floor(x/sampleSize) * sampleSize;
            let pixY = Math.floor(y/sampleSize) * sampleSize;
            let pixPos= (pixX + pixY * w) * 4;
            if(prevFrame.length>0){
           // result[pos] = data[pixPos] - prevFrame[pixPos];
            //result[pos+1] = data[pixPos+1] - prevFrame[pixPos +1];
            if(Math.abs(data[pixPos] - prevFrame[pixPos]) > 50){
                result[pos] = (data[pixPos] - prevFrame[pixPos]);
                result[pos+1] =( data[pixPos+1] - prevFrame[pixPos +1]);
                result[pos+2] = 255-(data[pixPos+2] - prevFrame[pixPos +2]);
            }
            }
        }
    }

    prevFrame = result;

    return result;


}

function detect(data){
    let motion = [];
    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
          var pos = (x + y * w) * 4;
          var r = data[pos];
          var g = data[pos+1];
          var b = data[pos+2];
          motion[pos]= 255;
          motion[pos+1]= 255;
          motion[pos+2]= 255;
          if(old[pos] && Math.abs(old[pos].red - r) > threshold) {
            // push the x, y and rgb values into the motion array
            // but multiply the x and y values bck up by scalefactor
            // to get their actual screen position
            //motion.push({x: x * scalefactor, y: y * scalefactor, r: r, g: g, b: b});
           motion[pos] = r;
           motion[pos+1] = 0;
           motion[pos+2] = 0;

          }
          else{
            motion[pos+3] = 0;
          }
          old[pos] = { red: r, green: g, blue: b};
    }
      }
      //console.log(motion)
    
    return motion;
}

// function detect(data){
//     let newFrame = data;
//     //console.log(prevFrame.length)
//     if (prevFrame.length > 0){
//         for (let y = 0; y < h; y+= 1){
//             for (let x = 0; x < w; x+= 1){
//                 let pos = (x + y * w) * 4;
//                 newFrame[pos] =255 - Math.abs(data[pos +2] - prevFrame[pos + 2]);
//                 newFrame[pos + 1] = 255 - Math.abs(data[pos +2] - prevFrame[pos + 2]);
//                // newFrame[pos + 2] = 255 - Math.abs(data[pos +2] - prevFrame[pos + 2]);
//                 newFrame[pos + 2] =255;

//                 //let pixX = Math.floor(x/sampleSize) * sampleSize;
//                 //let pixY = Math.floor(y/sampleSize) * sampleSize;
//             }
//         }
//     }
//         prevFrame = data;
//     return newFrame;
// }
