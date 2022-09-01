const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var fruit;
var fruitCon;
var rabbit;
var button;
var left, right;

function setup() {
  createCanvas(900, 500);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  button = createImg();
  button.position(220, 30);
  button.size(50, 50);
  button.mouseClicked(drop);

  ground = new Ground(450, 490, 900, 20);
  right = new Ground(750, 200, 300, 50);
  left = new Ground(150, 200, 300, 50);

  rope = new Rope(6, { x: 350, y: 200 });

  fruitOptions = {
    density: 0.001,
  };

  fruit = Bodies.circle(300, 300, 15, fruitOptions);
  Composite.add(rope.body, fruit);

  fruitCon = new Link(rope, fruit);

  rabbit = createSprite(250, 650, 100, 100);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);

  imageMode(CENTER);
}

function draw() {
  background(51);

  ground.show();
  rope.show();
  right.show();
  left.show();

  ellipse(fruit.position.x, fruit.position.y, 30, 30);

  Engine.update(engine);

  drawSprites();
}

function drop() {
  rope.break();
  fruitCon.detach();
  fruitCon = null;
}
