var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bgImg, van, girlImg;
var score = 0;
var rockImg, grass, mushroomImg, cloudImg, tireImg;
var obstaclesGroup, cloudsGroup
var score = 0;
var gameOverImg, restartImg;
var house;
var houseImg;
var gC;

function preload(){
van = loadImage ("van.png")
bgImg = loadImage ("bg.jpg");
girlImg = loadAnimation("g1.PNG", "g2.PNG", "g3.PNG", "g4.PNG");
rockImg = loadImage("rock.png");
grass = loadImage ("grass.png");
mushroomImg = loadImage ("mushroom.png");
cloudImg = loadImage("cloud.png")
gameOverImg = loadImage ("gameOver.png");
restartImg = loadImage("restart.png")
gC = loadAnimation("g2.png");
tireImg = loadImage("tire.png");
houseImg = loadImage("house.png");
}

function setup(){
createCanvas(1200, 500);

van1 = createSprite(90,430,20,20)
van1.addImage("van", van);
van1.scale = 0.25;

girl = createSprite(210,466,20,20);
girl.addAnimation ("girl", girlImg);
girl.addAnimation("collided", gC);
girl.scale = 0.3;

house = createSprite(1000,450,100,100);
house.addImage("house", houseImg);
house.velocityX = -0.5;
house.scale = 0.35;

ground = createSprite(600,480,1200,11);
ground.addImage("grass", grass)
ground.scale= 1;
ground.shapeColor = "black";
ground.velocityX = -5;
ground.x = ground.width/2;

gameOver = createSprite(630,140);
gameOver.addImage("gameOver", gameOverImg);
gameOver.scale = 0.35;

restart = createSprite(628,220);
restart.addImage("restart", restartImg);
restart.scale = 0.1;

gameOver.visible = false;
restart.visible = false;

invisibleGround = createSprite(600,480,12000,11);
invisibleGround.visible = false;

obstaclesGroup = new Group();
cloudsGroup = new Group();

score = 0;

}

function draw(){
  background(bgImg)
  textSize(30);
  fill ("black");
  text("Score: "+ score, 1000,30);

  textSize(10);
  fill ("blue");
  text("Vibha Shivakumar", 30,20,);


  if(gameState === PLAY){

  score = score + Math.round(getFrameRate()/60); 
  ground.velocityX = -(6 + 3*score/100);

  house.visible = true;


  if(keyDown("space")&& girl.y>= 420){
    girl.velocityY = -10;
  }

  girl.velocityY = girl.velocityY + 0.4;

  if(ground.x<0){
    ground.x = ground.width/2;
  }

  girl.collide(invisibleGround); 


  spawnObstacles();
  cloud();
  h1();

  if(obstaclesGroup.isTouching(girl)){
    gameState = END;
  }
}
  else if(gameState===END){
    textSize(40)
    fill("black");
    text("Nice Try!", 565,60)
    

gameOver.visible = true;
restart.visible= true;


girl.changeAnimation("collided", gC);

ground.velocityX = 0;
girl.velocityY = 0;
house.velocityX = 0;

house.visible = false;

obstaclesGroup.setVelocityXEach(0);
cloudsGroup.setVelocityXEach(0);

obstaclesGroup.setLifetimeEach(-1);
cloudsGroup.setLifetimeEach(-1);

if(mousePressedOver(restart)) {
  reset();
 } 
 }
  drawSprites()
}

function cloud(){
  if(frameCount%90 === 0){
    var c = createSprite(1000,70,10,20);
    c.y = Math.round(random(80,120));
    c.addImage("cloud", cloudImg);
    c.velocityX = -5;
    c.scale = 0.2;

    c.lifetime = 200;
    cloudsGroup.add(c);
}
}

function spawnObstacles() {
  if(frameCount % 80 === 0) {
    var obstacle = createSprite(600,470,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(rockImg);
              break;
      case 2: obstacle.addImage(mushroomImg);
              break;
      case 3: obstacle.addImage(tireImg);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  girl.changeAnimation("girl", girlImg);

  gameOver.visible = false;
  restart.visible = false;

house.x = 1000;
house.y = 450;
house.velocityX = -0.5;
  
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();

  score = 0;
}

function h1(){
  if(house.isTouching(girl)){
    gameState = END;
  }
}

  