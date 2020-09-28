var PLAY = 0;
var END = 1;
var gameState = PLAY;
var monkey , monkey_running
var ground
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png", "sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(550,500);
  
       monkey = createSprite(160,400);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(300,428,1150,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  
  score = 0;
  
}


function draw() {
  background("white");
  
  fill("black");
  textSize(20);
  text("Score:  " + score,200,100);
  
  
  if(gameState === PLAY){
    
    score = score + Math.round(frameCount/200);

 

    
   if(keyDown("space") && monkey.y >= 390) {
     monkey.velocityY = -6;
   }
    
    
  monkey.velocityY = monkey.velocityY + 0.2;
    
     if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
  }
    
    fruits();
    obstacles();
    
      if(obstacleGroup.isTouching(monkey)){
         FoodGroup.destroyEach();
         obstacleGroup.destroyEach();
         gameState = END;
         
         }
  }
  else if(gameState === END){
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    fill("black");
    text("Press R to restart",200,150);
    
    if(keyDown("r")){
      score === 0;
     reset();
      
    }
    
  }
   
    
  
    if(ground.x < 0) {
       ground.x = ground.width/2;
    }
  
    monkey.collide(ground);
  
    drawSprites();
  }

function reset() {
  gameState = PLAY;

  score = 0;
  
  
  
}



function fruits() {
  
     if(frameCount % 100 === 0){
     banana = createSprite(600);
     banana.scale = 0.1;
     banana.velocityX = -4;
     banana.y = Math.round(random(240,380));
     banana .addImage(bananaImage);
     banana.lifetime = -1;
     FoodGroup.add(banana);
     
   }
}
function obstacles() {
  
  if(frameCount % 300 === 0){
    obstacle = createSprite(600,405);
    obstacle.scale = 0.1;
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -4;
    obstacle.lifetime = -1;
    obstacleGroup.add(obstacle);
   
    
  }
  
  
}





