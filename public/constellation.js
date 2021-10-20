//https://p5js.org/examples/motion-circle-collision.html
const fs = require('fs');

class Headshot {
  constructor(path, x, y, dims) {
    this.path = path;
    this.position = new p5.Vector(x, y);
    this.velocity = p5.Vector.random2D();
    // this.velocity.mult(2);
    //image dimensions in dim object with width (w) and height (h) key value pairs
    this.w = dims.w;
    this.h = dims.h;
    //track if image is selected;
    this.selected = false;
  }
  update() {
    this.position.add(this.velocity);
  }

  checkBoundaryCollision() {
    //outside right bound
    if (this.position.x + this.w > width) {
      this.position.x = width - this.w;
      this.velocity.x *= -1;
    }
    //outside left bound 
    else if (this.position.x < 0) {
      this.position.x = 0;
      this.velocity.x *= -1;
    }
    //outside top bound 
    else if (this.position.y + this.h> height) {
      this.position.y = height - this.h;
      this.velocity.y *= -1;
    }
    //outside bottom bound 
    else if (this.position.y < 0) {
      this.position.y = 0;
      this.velocity.y *= -1;
    }
  }

  clicked(mouseX,mouseY){
    // console.log(`mouse coordinates: (${mouseX},${mouseY})`)
    // console.log('in CLICKED for this: ',this)
    //if mouse click is within image
    // console.log('clicked before set selected: ',this);
    if(mouseX > this.position.x && mouseX < this.position.x+this.w && mouseY> this.position.y && mouseY < this.position.y+this.h){
      this.selected = true;
      // console.log('Clicked on: ',this);
    }
  }

  display() {
    image(this.path, this.position.x, this.position.y, this.w, this.h);
  }

  showLargeImage() {
    image(this.path, windowWidth/2-250, windowHeight/2-250, 500, 500);
  }
}

let hof;
let fileNames=[];
let balls = [];
let imgSizes = [{w: 50, h: 50},{w: 75, h: 75},{w: 100, h: 100},{w: 125, h: 125},{w: 150, h: 150}];
let selectedImg;

 function preload(){
  hof = loadImage("assets/hof.jpg")
  fs.readdir('./public/assets/',(err,results)=>{
    if(err){
      console.log(err);
    } else{
      fileNames = results;
      fileNames.forEach(name=>{
        let img = loadImage(`assets/${name}`);
        let dims = imgSizes[Math.floor(Math.random()*5)];
        let xCoord = Math.floor(Math.random()*windowWidth);
        let yCoord = Math.floor(Math.random()*windowHeight);
        balls.push(new Headshot(img, xCoord,yCoord,random(imgSizes)))
      })
    }
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function mousePressed(){
  console.log('mouse pressed')
  for(let i = 0; i < balls.length; i++){
    balls[i].clicked(mouseX,mouseY);
  }
}

function draw() {
  background('#CCA875');
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.update();
    b.display();
    b.checkBoundaryCollision();
    if(b.selected){
      if(selectedImg && selectedImg!==b){
        selectedImg.selected = false;
      }
      selectedImg = b;
      selectedImg.showLargeImage();
      console.log('in DRAW this is selected: ',selectedImg)
    }
  }
}