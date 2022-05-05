let mic, recorder, soundFile;
let state = 0;

let w = window.innerWidth;
let h = window.innerHeight;

function setup() {
  //canvas setup
  canvas = createCanvas(w, h);
  pg = createGraphics(300, 300);
  

  // button with function record
	button = createButton('click me');
  button.position(w/2 -30, h/1.25);
  button.mousePressed(startRec);

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
  if (state === 1){
    console.log('dit is de state ' + state);
    textSize(30);
    fill('red'); 
    text('recording...', w/2 - 60, h/2);
  }
  else if (state === 2){
    textSize(30);
    fill('green'); 
    text('done, click to save', w/2 - 60, h/2)
  }
}

function startRec(){
  if (state === 0 && mic.enabled) {
    // record to our p5.SoundFile
    getAudioContext().resume()
    recorder.record(soundFile);
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
    // save(soundFile, 'mySound.wav');
    state++;
  }
} 

// resize canvas when browser resize
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
//   background(50, 55, 100);
// }






