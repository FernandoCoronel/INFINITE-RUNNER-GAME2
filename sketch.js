var monkey, monkeyimg ,monkey_still ;
var jungle, jungleimg ;
var ground;
var banana, bananaimg, bananagroup ;
var stone, stoneimg ;
var eat, score, stonegroup ;
var gameState ;

function preload(){
  
  jungleimg = loadImage("jungle.jpg");
  stoneimg = loadImage("stone.png");
  bananaimg = loadImage("banana.png");
  monkey_still=loadImage("Monkey_03.png");
  monkeyimg = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
}

function setup() {
  
  createCanvas(displayWidth, displayHeight);

  jungle=createSprite(width/2,height/2,width,height);
  jungle.addImage(jungleimg);
  jungle.velocityX=-4;
  jungle.scale=2;
  
  ground = createSprite(width/2,height-25,width,10);
  ground.visible=false;

  monkey = createSprite(width/2,height-80,0,0);
  monkey.addAnimation("running",monkeyimg);
  monkey.scale=0.14;
  monkey.addAnimation("still",monkey_still);
  
  bananagroup = new Group();
  stonegroup = new Group();
  
  gameState = "play";
  
  eat = 0;
  score = 0;
  
}

function draw(){
  background("black")
  camera.x = monkey.x;
  camera.y = monkey.y;
  
  if(keyDown("space") && monkey.collide(ground) && gameState==="play"){
    monkey.velocityY=-16;
  } 
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
  
  //for conditions when game state is in play
 if(gameState==="play"){
  
   if (jungle.x < width/4){
    jungle.x = jungle.width/2;
  }
   
   //to spawn bananas
  if(frameCount%120===0){
    bananas();     
  } 
  
   //to spawn rocks
  if(frameCount%200===0){
    obstacles();  
  } 
   
   if(bananagroup.isTouching(monkey)){
     bananagroup.destroyEach();
     eat=eat+2;
  }
  
  if(stonegroup.isTouching(monkey)){
    
    stonegroup.destroyEach();
  
      gameState="end";  
    
     
  }
   
   switch (eat){
  
    case 0:
      monkey.scale=0.14;
      break;
      
    case 10:
      monkey.scale=0.17;
      break;
      
    case 20:
      monkey.scale=0.2;
      break;
      
    case 30:
      monkey.scale=0.24;
      break;
  
   }
  }else if(gameState==="end"){
  
   jungle.velocityX=0;
    
   bananagroup.destroyEach();
   
   monkey.changeAnimation("still",monkey_still);
    
   if(frameCount%10===0){
     score=score-1;
     
  }
    
     
  }
  
   drawSprites();  
  
   fill("yellow");
  textSize(20);
  if(frameCount%10===0){
     score=score+1;
  }
  text("Score= "+score,width/2+120,30 ); 
  text("Banana's Eaten : "+ eat,width/2+120,55);
  
}
  


function bananas(){
  
 banana =  createSprite(width,random(height/2-50,height/2-50),0,0);
 banana.addImage(bananaimg); 
 banana.scale=0.06;
 banana.velocityX=-(6+score/70);
 banana.lifetime=220;
 bananagroup.add(banana); 
  
}

function obstacles(){

  stones = createSprite(width,height-40,0,0);
  stones.addImage(stoneimg);
  stones.scale=0.2;
  stones.velocityX=-(6+score/70);
  stones.lifetime=220;
  stonegroup.add(stones);

}  




