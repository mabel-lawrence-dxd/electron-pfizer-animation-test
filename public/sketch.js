function setup() {
  createCanvas(windowWidth, windowHeight);
  init();
}

function draw() {
  spray();
}

function init(){
  const p = {color: ["yellow"], angle: [-30,50], speed: 2};
  of = new Fountain(null,p,-10,-10);
}

function spray(){
  background(0);
  push();
  of.CreateN();
  of.Draw();
  of.Step();
  pop();
}