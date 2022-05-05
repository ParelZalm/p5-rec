let mic, recorder, soundFile;
let state = 0;

let w = window.innerWidth;
let h = window.innerHeight;

function setup() {
  //canvas setup
  canvas = createCanvas(w, h);
  background(50, 55, 100);

  // button with function record
	button = createButton('click me');
  button.position(w/2, h/1.25);
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

function startRec(){
  if (state === 0 && mic.enabled) {
    // record to our p5.SoundFile
    recorder.record(soundFile);
    let div = createDiv('Recording!');
    div.style('font-size', '80px');
    div.position(w/2, h/2);
    state++;
  }
  else if (state === 1) {
    background(0,255,0);
    // stop recorder and
    // send result to soundFile
    recorder.stop();
    text('Stopped', 20, 20);
    state++;
  }
  else if (state === 2) {
    soundFile.play(); // play the result!
    save(soundFile, 'mySound.wav');
    state++;
  }

} 






