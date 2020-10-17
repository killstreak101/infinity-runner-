var Play = 1;
var End = 0;
var gamestate = Play;

var ground,groundImg;

var boy,boyImg;

var inviGround;

var obstaclesGroup,ob1,ob2,ob3,ob4,ob5,ob6,ob7,ob8;

var score;
var gameoverImg,restartImg;
var jumpSnd,dieSnd;


function preload(){

   groundImg = loadAnimation("image_01_025.jpg");
  
  
boyImg=loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png","boy5.png","boy6.png","boy7.png","boy8.png");
  
 
  ob1 = loadAnimation("blade1.png");
  ob2 = loadAnimation("blade2.png");
  ob3 = loadAnimation("blade3.png");
  ob4 = loadAnimation("blade4.png");
  ob5 = loadAnimation("blade5.png");
  ob6 = loadAnimation("blade6.png");
  ob7 = loadAnimation("laser1.png");
  ob8 = loadAnimation("laser2.png");
  
  gameoverImg = loadImage("images-removebg-preview.png");
  restartImg = loadImage("79-791506_reset-button-restart-button-pixel-art-8-bit-removebg-preview.png");
  
  jumpSnd = loadSound("jump.mp3");
  dieSnd = loadSound("gameover.mp3");
   
  
}

function setup() {
 createCanvas(600,400);
  
  ground = createSprite(300,200,600,400);
ground.addAnimation("ground",groundImg);  
ground.x = ground.width/2; 
  
 boy = createSprite(50,320,20,50);
 boy.addAnimation("boy",boyImg);
 boy.scale = 0.5;
  

  
  
  gameover = createSprite(300,150);
  gameover.addImage(gameoverImg);
  
  restart = createSprite(300,300);
  restart.addImage(restartImg);
  
  gameover.scale = 1.6;
  restart.scale = 0.2;
  
  inviGround = createSprite(200,365,400,10);
  inviGround.visible = false;
  
  obstaclesGroup = createGroup();
  
  boy.setCollider("circle",0,0,40);
  boy.debug = false;
  
  score=0;
  
}

function draw() {
 background("green");

    
  if(gamestate === Play){

    gameover.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    
    score = score + Math.round(getFrameRate()/60);
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& boy.y >= 230) {
        boy.velocityY = -12;
        jumpSnd.play();
    }
    
    boy.velocityY = boy.velocityY + 0.8;

    spawnobstacles();
    
    if(obstaclesGroup.isTouching(boy)){
        gamestate = End;
        dieSnd.play()
      
    }
  }
   else if (gamestate === End) {
      gameover.visible = true;
      restart.visible = true;

      ground.velocityX = 0;
      boy.velocityY = 0
      
    obstaclesGroup.setLifetimeEach(-1);
    
     obstaclesGroup.setVelocityXEach(0);
   
     
  if(mousePressedOver(restart)) {
    reset();
    }

   }
  
  boy.collide(inviGround);
  

  drawSprites();
  
fill("black");
textSize(20);
text("Score: "+ score, 480,50);
  
}

function reset(){
  
  gamestate = Play;
  
  obstaclesGroup.destroyEach();
  
  score =0;
  
}

function spawnobstacles(){
 if (frameCount % 100 === 0){
   var obstacle = createSprite(600,335,10,40);
   obstacle.velocityX = -(6 + 3* score/50);
   
    var rand = Math.round(random(1,8));
    switch(rand) {
      case 1: obstacle.addAnimation("obsracles",ob1);
              break;
      case 2: obstacle.addAnimation("obsracles",ob2);
              break;
      case 3: obstacle.addAnimation("obsracles",ob3);
              break;
      case 4: obstacle.addAnimation("obsracles",ob4);
              break;
      case 5: obstacle.addAnimation("obsracles",ob5);
              break;
      case 6: obstacle.addAnimation("obsracles",ob6);
              break;
              case 7: obstacle.addAnimation("obsracles",ob7);
        break;
        case 8: obstacle.addAnimation("obsracles",ob8);
        break;
      default: break;
    }
        
    obstacle.scale = 1;
    obstacle.lifetime = 300;
   
    obstaclesGroup.add(obstacle);
 }
}