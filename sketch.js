let mic, recorder, soundFile;
let state = 0;
let numberFile = 0;
let bubbles = [];
let thisSound;
let button;
let delFile;
// log height and width
let w = window.innerWidth;
let h = window.innerHeight;

function setup() {
  //canvas setup
  canvas = createCanvas(w, h);
  pg = createGraphics(300, 300);
  
  // create a new amplitude analyzer
  analyzer = new p5.Amplitude();

  //initiate mic
  mic = new p5.AudioIn();
  mic.start();

  // create a sound recorder
  recorder = new p5.SoundRecorder();
  // connect the mic to the recorder
  recorder.setInput(mic);
  // initiate soundfile to record
  soundFile = new p5.SoundFile();
  soundFile.rate(1);

  button = createButton('Start record');
  button.position(w/2 -30, h/1.25);
  button.mousePressed(recordLoop);
}

function plsWork(){
  console.log('itworks')
}

function draw(){
  background(50, 55, 100);
  // frameRate(24);

  // state text function
  if (state === 1){
    textSize(30);
    noStroke();
    fill('red'); 
    text('recording...', w/2 - 60, h/2);
  }
  // loop through bubbles and add when invoked
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
    bubbles[i].read(mouseX, mouseY, i);
    // bubbles[i].del(mouseX, mouseY, i);
  }
  if (bubbles.length > 10) {
    bubbles.splice(0, 1)
  }
}

function recordLoop(){
  if (state === 0 && mic.enabled) {
    // record to our p5.SoundFile
    getAudioContext().resume()
    recorder.record(soundFile);
    state++; 
    button.html('stop record');
    button.style('color', '#ff0000')
  }
  else if (state === 1) {
    // stop recorder and
    // send result to soundFile
    recorder.stop();
    state++;
    button.html('save record');
    button.style('color', 'green')
  }
  else if (state === 2) {
    soundFile.play(); // play the result!
    console.log(soundFile);
    // soundFile.rate(1);
    save(soundFile, numberFile+'.wav');
    console.log('how many')
    state = 0;
    numberFile += 1;
    // function for bubbles
    pushBubble(numberFile);
    button.html('start record');
    button.style('color', 'white');
  }
} 

function pushBubble(numberFile){
  console.log(numberFile);
  let r = random(10,40);
  let b = new Bubble(50, 100, r)
  bubbles.push(b)
}

class Bubble {
  constructor(x, y, r, wav){
    let ranx = random(300,600);
    let rany = random(300,600);
    
    this.x = ranx;
    this.y = rany;
    this.r = r;
    this.brightness = 0;
    this.soundFile = numberFile + '.wav';
  }
  move(){
    // this.x = this.x += random(-5,5);
    // this.y = this.y += random(-5,5);
  }
  show(){
    fill(this.brightness, 125);
    ellipse(this.x, this.y, this.r * 2);
  }
  read(pixelX, pixelY, i){
    let distance = dist(pixelX, pixelY, this.x, this.y);
    if (distance < this.r){
      // on hover change brightness
      this.brightness += 25;
      // define audio let
      thisSound = new Audio("records/" + i + ".wav");
      // text center
      textSize(20);
      noStroke();
      fill('white'); 
      text('Click to Play', pixelX + 10, pixelY + 5);
      fill('red'); 
      textSize(12);
      text('Press any Key to delete', pixelX + 10, pixelY + 25);
    }  else {
      this.brightness = 125;
    }
    if (distance < this.r && mouseIsPressed === true){
      noLoop();
      thisSound.play();
      makeDelay();
    }
  }
  // del(pixelX, pixelY, i){
  //   let distance = dist(pixelX, pixelY, this.x, this.y);
  //   if (distance < this.r && keyIsPressed === true){
  //     noLoop();
  //     bubbles.splice(i);
  //   }
  // }
}

// define delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve ,ms));
// delay function 
async function makeDelay(){
  await delay(500);
  console.log('loop() started again');
  await delay(250);
  loop();
}


// resize canvas when browser resize
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
//   background(50, 55, 100);
// }






