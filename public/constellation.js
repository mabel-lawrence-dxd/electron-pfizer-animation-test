//https://p5js.org/examples/motion-circle-collision.html
const fs = require('fs');

class Ball {
  constructor(x, y, r) {
    this.position = new p5.Vector(x, y);
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(2);
    this.r = r;
    this.m = r * 0.1;
  }
  update() {
    this.position.add(this.velocity);
  }

  checkBoundaryCollision() {
    if (this.position.x > width - this.r) {
      this.position.x = width - this.r;
      this.velocity.x *= -1;
    } else if (this.position.x < this.r) {
      this.position.x = this.r;
      this.velocity.x *= -1;
    } else if (this.position.y > height - this.r) {
      this.position.y = height - this.r;
      this.velocity.y *= -1;
    } else if (this.position.y < this.r) {
      this.position.y = this.r;
      this.velocity.y *= -1;
    }
  }

  display() {
    // noStroke();
    // fill(204);
    // ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2);
    image(hof, this.position.x, this.position.y, this.r*2, this.r*2);
  }
}

let balls = [new Ball(100, 400, 20), new Ball(700, 400, 80)];

let hof;
let files;

function preload(){
  hof = loadImage("assets/hof.jpg")
  fs.readdir('./public/assets/',(err,results)=>{
    if(err){
      console.log(err);
    } else{
      files = results;
    }
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(files);
}

function draw() {
  background('#CCA875');
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    b.update();
    b.display();
    b.checkBoundaryCollision();
  }
}