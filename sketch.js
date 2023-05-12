let ground;
let lander;
var lander_img;
var bg_img;
var bullet_img,bullet;
var alien_img,alien;
var aliensGroup,bulletsGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;
var boom_img,gameOver_img,restart_img;
var restart,boom,gameOver; 
var score=0;



var vx = 0;
var g = 0.05;
var vy = 0;

function preload()
{
  lander_img = loadAnimation("normal.png");
  bg_img = loadImage("bg.png");
  bullet_img = loadImage("bullet.png");
  alien_img = loadImage("alien.png");
  gameOver_img = loadImage("gameOver.png");
  boom_img = loadAnimation("boom.png");
  restart_img = loadImage("restart.png");

}

function setup() {
  createCanvas(1000,700);
  frameRate(80);

  lander = createSprite(150,300,30,30);
  lander.addAnimation("shooting",lander_img);
  lander.addAnimation("blast",boom_img);
  lander.scale = 0.1;


  

  gameOver = createSprite(500,200);
  gameOver.addImage(gameOver_img);
  gameOver.scale=0.5;

  restart = createSprite(500,350);
  restart.addImage(restart_img);
  restart.scale=0.2;

  lander.setCollider("circle",0,0,10);

  lander.debug=true;

  
 

  //lander.depth = bullet.depth+1;


  aliensGroup = createGroup();
  bulletsGroup = createGroup();

  


  rectMode(CENTER);
  textSize(15);
}

function draw() 
{
  background(51);
  image(bg_img,0,0);
  push()
  fill(255);
  text("Score: "+score,800,75);
  pop();

  //fall down
 // vy +=g;
  //lander.position.y+=vy;
 // bullet.position.x=lander.position.x;
 // bullet.position.y=lander.position.y;
  if(gameState===PLAY){
    gameOver.visible=false;
    restart.visible=false;
    lander.changeAnimation("shooting",lander_img);
    

  
 

  if(keyIsDown(UP_ARROW)){
    lander.position.y-=5;
   }

   if(keyIsDown(DOWN_ARROW)){
    lander.position.y+=5;
   }

   if(keyIsDown(LEFT_ARROW)){
    lander.position.x-=5;
   }

   if(keyIsDown(RIGHT_ARROW)){
    lander.position.x+=5;

   }

   if(aliensGroup.isTouching(bulletsGroup)){
    for(var i=0;i<aliensGroup.length;i++){
      if(aliensGroup[i].isTouching(bulletsGroup)){
        aliensGroup[i].destroy();
        bulletsGroup.destroyEach();
        score=score+2;
      }
    }
    
  }
   spawnAliens();
   spawnBullets();



  
   if(aliensGroup.isTouching(lander)){
    gameState=END;
   }
  }
  else if(gameState===END){
    gameOver.visible=true;
    restart.visible=true;
    lander.changeAnimation("blast",boom_img);
    aliensGroup.setVelocityYEach(0);
    if(mousePressedOver(restart)){
      reset();
    }
  }

   

   





  drawSprites();
}

function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  aliensGroup.destroyEach();
  bulletsGroup.destroyEach();
  score=0;
}

function spawnAliens(){
  if(frameCount % 60 === 0){
    alien = createSprite(150,100,50,70);
  alien.x=Math.round(random(150,600));
  alien.addImage(alien_img);
  alien.scale = 0.3;
  alien.velocityY=2;

  //alien.lifetime=180;
  aliensGroup.add(alien);


  }
}

function spawnBullets(){
  if(keyDown("SPACE")){
    bullet = createSprite(lander.x,lander.y,30,30);
  //bullet.x=lander.x;
  bullet.addImage(bullet_img);
  bullet.scale = 0.015;
  bullet.velocityY=-2;

 // bullet.lifetime=180;
  bulletsGroup.add(bullet);
  lander.depth=bullet.depth+1


  }
}





