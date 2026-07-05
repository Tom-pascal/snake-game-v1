const grid = document.getElementById("mycanvas")
const scoreboard = document.getElementById("score-p")
const gameover = document.getElementById("gameover-h2")
let gameid;
let coordinates;
let score = 0;
let dy = 0;
let  dx = 10 ;
grid2 = grid.getContext("2d")


grid2.fillStyle = "beige";


grid2.strokeStyle = "black"
grid2.lineWidth = 2;
//fills the rect
grid2.fillRect(0,0,300,300)
//creates a hollow rect outline
grid2.strokeStyle = "black"
grid2.strokeRect(0,0,300,300)


//representing the snake 

let snakes = [
{
    x:150,
    y: 150
},
{
    x:140,
    y: 150
},
{
    x:130,
    y: 150
},
{
    x:120,
    y: 150
},
{
    x:110,
    y: 150
}, 
]

function drawSnakePart(SnakePart) {
    grid2.fillStyle = "lightgreen";
    grid2.strokeStyle = "darkgreen"
    
    //creating the blocks
    grid2.fillRect(SnakePart.x,SnakePart.y,10,10)
    grid2.strokeRect(SnakePart.x,SnakePart.y,10,10)

}



function drawSnake(){
    
snakes.forEach(snake =>{
     drawSnakePart(snake)
})

}



function advancesnake(){


 const head = { 
    x: snakes[0].x + dx ,
    y: snakes[0].y + dy


 }
  snakes.unshift(head)

 
 const didEatFood = snakes[0].x === coordinates.xcord && snakes[0].y === coordinates.ycord
 if(didEatFood){
    coordinates = randomTen()
   score+= 10 ;
 }else{
     snakes.pop()

   
 }
  scoreboard.textContent = "Score : "+score
}

function clearcanvas(){
 grid2.fillStyle= "beige"
 grid2.strokeStyle = "black"

 grid2.fillRect(0,0,300,300);
 grid2.strokeRect(0,0,300,300);

}

document.addEventListener("keydown",(event)=>{
  const upKeyCode = 87
  const downKeyCode = 83
  const leftKeyCode = 65
  const rightKeyCode = 68
 
  const goingUp = dy === -10;
  const goingDown = dy === 10
  const goingLeft = dx === -10
  const goingRight = dx === 10

 if(event.keyCode === upKeyCode && !goingDown){
    dy = -10
    dx  = 0
    console.log("w working ")
 }else if(event.keyCode ===downKeyCode && !goingUp){
    dy = 10
    dx  = 0
    console.log(" s working ")

 }
 if(event.keyCode ===leftKeyCode && !goingRight){
    dy = 0
    dx  = -10
    console.log(" a working ")

 }
 if(event.keyCode ===rightKeyCode && !goingLeft){
    dy = 0
    dx  = 10
    console.log(" d working ")

 }



})


function randomTen(){
    let  x = Math.floor(Math.random()*300)
    let  y = Math.floor(Math.random()*300)
    
    
  
  for(let i=0 ; i< snakes.length;i++){
    if(x === snakes[i]){
        x = Math.round(Math.random()*300)
        console.log(x + "x was equal to snake")
        // return x;
        if(y=== snakes[i].y){
            y = Math.round(Math.random()*300)
            
        console.log(y + "y was equal to snake")
        
        // return y ;
    }
    }else if(y=== snakes[i].y){
          y = Math.round(Math.random()*300)
        console.log(x + "x was equal to snake")
        
    }

  }
     console.log("none was equal")
   newx = Math.floor(x/10)*10
   newy = Math.floor(y/10)*10
 let cords = {
    xcord : newx,
    ycord : newy
 }

 return cords;
}




///fuction for creating the fruits
 coordinates = randomTen()
setInterval(()=>{
   coordinates = randomTen()
   console.log(coordinates)
},5000)
function drawfruits(cords){

    grid2.fillStyle = "red"
    grid2.strokeStyle = "darkred"
     let x = cords.xcord;
     let y = cords.ycord;
    grid2.fillRect(x, y ,10,10)
    grid2.strokeRect(x, y ,10,10)

}

function main(){
    clearcanvas()
    drawfruits(coordinates)
    advancesnake()
    drawSnake()
    //didGameEnd()
}
 gameid = setInterval(main,100)

function didGameEnd(){

   for(let i=4; i< snakes.length ;i++){
   const bititself= snakes[0].x === snakes[i].x && snakes[0].y=== snakes[i].y
   if(bititself){
    return true ;
   } 
 }
   const collidedwithwalls = snakes[0].x === 0 || snakes[0].y === 0 || snakes[0].x === 300 || snakes[0].y === 300
if(collidedwithwalls){
    return true ;
}
}

setInterval(() => {
    let gameended = didGameEnd()
    if(gameended){
        clearInterval(gameid)
        gameover.textContent = "GAMEOVER! refresh to start new game."
    }
}, 50);
