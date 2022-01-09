var bg,bgImg;
var player, shooterImg, shooter_shooting;
var score=0,zGroup
var bullet,bGroup;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  bgImg = loadImage("assets/bg.jpeg")
  zombieImg= loadImage("assets/zombie.png")
  heart1Img= loadImage("assets/heart_1.png")
  heart2Img= loadImage("assets/heart_2.png")
  heart3Img= loadImage("assets/heart_3.png")
  bulletImg= loadImage("assets/bullet.png")

}

function setup() {

  createCanvas(displayWidth,displayHeight);

  zGroup=new Group()
  bGroup=new Group()


  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = false
   player.setCollider("rectangle",0,0,250,300)


heart1 = createSprite(displayWidth-150,100,100)
 heart1.addImage(heart1Img)
 heart1.scale = 0.4

 
 heart2 = createSprite(displayWidth-100,100,150)
 heart2.addImage(heart2Img)
 heart2.scale = 0.4


 heart3 = createSprite(displayWidth-150,100,100)
 heart3.addImage(heart3Img)
 heart3.scale = 0.4


}

function draw() {
  background(0); 


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
  
  spawnbullets() 
  
}


 

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if (zGroup.isTouching(player))   {

  for (var i = 0;i<zGroup.length;i++) {
  
    if (zGroup[i].isTouching(player)) {

      zGroup[i].destroy()
    }
  }




}


zombies();

drawSprites();

fill("white")
textSize(50)
text("score="+score,100,80)



}


function zombies()   {

  if  (frameCount%60 === 0)   {
    
    zombie = createSprite(1500,random(100,500),10,40)
    zombie.addImage("zombie",zombieImg)
    zombie.velocityX = -8
    zombie.scale = 0.15
    zombie.debug = false
    zombie.lifetime = 400
    zombie.setCollider("rectangle",0,0,500,800)

    zGroup.add(zombie)
  }



  function spawnbullets() {

    bullet = createSprite(player.x,player.y)
    bullet.addImage(bulletImg)
    bullet.scale = 0.2
    bullet.velocityX = 20
    bullet.lifetime = 30
    bGroup.add(bullet)
    
    

  }

}
