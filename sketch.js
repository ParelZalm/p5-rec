let mic, recorder, soundFile;
let state = 0;
let numberFile = 0;
let bubbles = []
let easing = 0.05;
let angle = 0;
let xEllipse = 100;
let yEllipse = 300;
let disX = 650;
let disY = 450;
let thisSound;


let w = window.innerWidth;
let h = window.innerHeight;

function setup() {
  //canvas setup
  canvas = createCanvas(w, h);
  pg = createGraphics(300, 300);
  angleMode(DEGREES);
  

  // button with function record
	// button = createButton('click me');
  // button.position(w/2 -30, h/1.25);
  // button.mouseClicked(startRec);

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
  angle++;
}

function keyTyped(){
  if (key =! 'r'){
    return;
  }
  if (state === 0 && mic.enabled) {
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
    console.log(numberFile)
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
    let ranx = random(0,600);
    let rany = random(0,600);
    this.x = ranx;
    this.y = rany;
    // this.x = disX + xEllipse * cos(angle);
    // this.y = disY + yEllipse * sin(angle);
    this.r = r;
    this.brightness = 0;
    // this.sound = numberFile + '.wav';
    this.soundFile = soundFile;
  }
  move(){
    // this.x = this.x += random(-5,5);
    // this.y = this.y += random(-5,5);
    // this.x = disX + xEllipse * cos(angle);
    // this.y = disY + yEllipse * sin(angle);
  }
  show(){
    stroke('turquoise');
    strokeWeight(4);
    fill(this.brightness, 125);
    ellipse(this.x, this.y, this.r * 2);
  }
  read(pixelX, pixelY, i){

    let distance = dist(pixelX, pixelY, this.x, this.y);
    if (distance < this.r){
      // console.log(bubbles[i]);
      console.log(i);
      this.brightness = 255;
      // this.soundFile.play();
      // this.soundFile.play();
      //console.log(this.soundFile);
      return;
    }
  }
}




// resize canvas when browser resize
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
//   background(50, 55, 100);
// }






