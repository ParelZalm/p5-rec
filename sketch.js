let mic, recorder, soundFile;
let state = 0;
let numberFile = 0;
let bubbles = [];
let thisSound;


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
}

function draw(){
  background(50, 55, 100);

  // state text function
  if (state === 1){
    textSize(30);
    noStroke();
    fill('red'); 
    text('recording...', w/2 - 60, h/2);
  }
  else if (state === 2){
    textSize(30);
    noStroke();
    fill('green'); 
    text('done, click to save', w/2 - 60, h/2)
  }

  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
    bubbles[i].read(mouseX, mouseY, i);
  }
  if (bubbles.length > 20) {
    bubbles.splice(0, 1)
  }
  textSize(20);
  noStroke();
  fill('white'); 
  text('press R to record', 30, h - 80)
  text('press S when hovering a bubble to play', 30, h - 60)
  text('press P after play to continue after S', 30, h - 40)
}

function keyTyped(){
  if (key === 'p'){
    loop();
  }
  if (state === 0 && mic.enabled && key === 'r') {
    // record to our p5.SoundFile
    // getAudioContext().resume()
    recorder.record(soundFile);
    console.log('state: ' + state);
    state++; 
  }
  else if (state === 1) {
    // stop recorder and
    // send result to soundFile
    recorder.stop();
    state++;
  }
  else if (state === 2) {
    soundFile.play(); // play the result!
    saveSound(soundFile, numberFile+'.wav');
    state = 0;
    numberFile += 1;
    // function for bubbles
    pushBubble(numberFile);
  }
} 

function pushBubble(numberFile){
  console.log(numberFile);
  let r = random(10,40);
  let b = new Bubble(50, 100, r)
  bubbles.push(b)
}

class Bubble {
  constructor(x, y, r){
    let ranx = random(300,600);
    let rany = random(300,600);
    this.x = ranx;
    this.y = rany;
    this.r = r;
    this.brightness = 0;
    // this.sound = numberFile + '.wav';
    this.soundFile = soundFile;
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
      // console.log(i);
      this.brightness += 25;
      // this.r += 20;
      thisSound = new Audio("records/" + i + ".wav");
      // console.log(thisSound);
      // noLoop();
    }  else {
      this.brightness = 125;
    }
    if (distance < this.r && key === 's'){
      noLoop();
      thisSound.play();
      console.log('hoevaak dan')
    }
  }
}


// resize canvas when browser resize
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
//   background(50, 55, 100);
// }






