let mic, recorder, soundFile;
let state = 0;
let numberFile = 0;
let bubbles = []


let w = window.innerWidth;
let h = window.innerHeight;

function setup() {
  //canvas setup
  canvas = createCanvas(w, h);
  pg = createGraphics(300, 300);
  

  // button with function record
	button = createButton('click me');
  button.position(w/2 -30, h/1.25);
  button.mouseClicked(startRec);

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
    fill('red'); 
    text('recording...', w/2 - 60, h/2);
  }
  else if (state === 2){
    textSize(30);
    fill('green'); 
    text('done, click to save', w/2 - 60, h/2)
  }

  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move()
    bubbles[i].show()

  }
  if (bubbles.length > 20) {
    bubbles.splice(0, 1)
  }
}

function startRec(){
  
  if (state === 0 && mic.enabled) {
    // record to our p5.SoundFile
    getAudioContext().resume()
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
    // save(soundFile, numberFile+'.wav');
    state = 0;
    numberFile++;
    // function for bubbles
    pushBubble(numberFile);
  }
} 

function pushBubble(numberFile){
  console.log(numberFile);
  // let r = random(10,40);
  let b = new Bubble(50, 100, 25)
  bubbles.push(b)
}

class Bubble {
  constructor(x, y, r){
    this.x = x;
    this.y = y;
    this.r = r;
    this.sound = numberFile + '.wav';
  }
  move(){
    this.x = this.x + random(-1,2);
    this.y = this.y + random(-1,2);
  }
  show(){
    stroke('turquoise');
    strokeWeight(4);
    noFill();
    ellipse(this.x, this.y, this.r * 2);
  }
}

// resize canvas when browser resize
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
//   background(50, 55, 100);
// }






