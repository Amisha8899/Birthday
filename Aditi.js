var canvas = document.querySelector("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var c = canvas.getContext("2d")
function boundaryLine(){
    c.moveTo(200,200)
    c.lineTo(1300,200)
    c.lineTo(1300,600)
    c.lineTo(200,600)
    c.lineTo(200,200)
    c.strokeStyle="#FFBBBB"
    c.stroke();
}
var Colorarray =["#25316D", "#5F6F94", "#97D2EC", "#FEF5AC"]
function insertImage() {
    image = new Image();
    image.src = "C:\\Users\\DELL\\Desktop\\AMISHA.jpg" ; 
    image.onload = function(){
      c.drawImage(image, 900,1300,500,350);
    }
  }
var mouse = {
    x:undefined,
    y:undefined
}
window.addEventListener("mousemove",function(event){
    mouse.x = event.x
    mouse.y = event.y
})
function fillText(text){
    c.font = "italic 70px Unknown Font, sans-serif"
    c.fillText(text,innerWidth/2-400,innerHeight/2+50)
    c.strokeStyle = "#293462"
    c.stroke()
}
window.addEventListener("resize",function () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight 
})
function randomColor(){
    var index =Math.floor(Math.random()*(Colorarray.length))
    return Colorarray[index] 
}
var arrRangeY = [[0, 200],[600,innerHeight]]
var arrRangeX = [[0,200],[1300,innerWidth]]
let coordinateX = []
let coordinateY = []
function getRandomNumber(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function coordinate(arr,arrCo){
for (let j = 0; j < 100; j++) {
for(i = 0; i < arr.length; i++) {
    min = arr[i][0];
    max = arr[i][1];
    randomNumber = getRandomNumber(min, max)
    arrCo.push(randomNumber)
}
}
return arrCo[Math.floor(Math.random()*arrCo.length)]
}
var maxRadius = 100
var gravity = Math.random()
var friction = 0.99
function Circle(x,y,radius,dx,dy,color){
    this.x = x
    this.y = y
    this.radius = radius
    this.dx = dx
    this.dy = dy
    this.color = color
    this.minRadius = radius
    this.draw = function(){
        c.strokeStyle = "black";
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        c.stroke();
        c.fillStyle = this.color
        c.fill()
    }
    this.interactivity = function(){
        if (mouse.x-this.x < 50 && mouse.x-this.x>-50 && mouse.y-this.y < 50 && mouse.y-this.y>-50){
            if(this.radius<maxRadius){
                this.radius+=1
            }
        }
        else if (this.radius>this.minRadius){
            this.radius-=1
        }
    }
    this.update = function(){
        if (this.x+this.radius>=innerWidth || this.x-this.radius<=0){
            this.dx = -this.dx
        }
        if (this.y+this.radius>=innerHeight || this.y-this.radius<=0){
            this.dy = -this.dy
        }
        this.x+=this.dx
        this.y+=this.dy
        this.draw()
        this.interactivity()
    }
    this.gravity = function(){
        if (this.y+this.radius>=innerHeight){
            this.dy = -this.dy*friction
        }
        this.radius=60
        this.dy+=gravity
        this.draw()
        this.interactivity()
    }
}
function Particle(x,y,distanceFromcentre){
    this.x = x
    this.y = y
    this.radius = 5
    this.color = randomColor()
    this.velocity = 0.05
    this.distanceFromcentre = distanceFromcentre
    this.radian = Math.random()*Math.PI*2
    this.update = function(){
        let startPoint = {x:this.x,y:this.y}
        this.radian= this.radian + this.velocity
        this.x = x+Math.cos(this.radian)*this.distanceFromcentre
        this.y = y+Math.sin(this.radian)*this.distanceFromcentre
        this.draw(startPoint)
    }
    this.draw = function(startPoint){
        c.beginPath()
        c.strokeStyle = this.color;
        c.lineWidth = this.radius
        c.moveTo(startPoint.x,startPoint.y)
        c.lineTo(this.x,this.y)
        // c.beginPath();
        // c.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        c.stroke();
        c.closePath()
        // c.fillStyle = this.color
        // c.fill()
    }
}
var CircleArray = []
var particleArray = []
for (let i = 0; i < 200 ; i++) {
    var radius = Math.random()*10+5
    var x = coordinate(arrRangeX,coordinateX)
    var y = coordinate(arrRangeY,coordinateY)
    // var x = Math.random()* window.innerWidth+radius;
    // var y = Math.random()* window.innerHeight+radius;
    var dx = (Math.random()-0.5)*5+1
    var dy = (Math.random()-0.5)*5+1
    var color = randomColor()
    CircleArray.push(new Circle(x,y,radius,dx,dy,color))
}
function ballMovement(){
    for (let i = 0; i < CircleArray.length; i++) {
        CircleArray[i].update();
    }
    fillText("HAPPY BIRTHDAY NEEMISHA !!!")
}
function ballGravity(){
    for (let i = 0; i < CircleArray.length; i++) {
        CircleArray[i].gravity();
    }
    clearInterval(ballMovement)
}
var particleArray1 = []
for (let i = 0; i <50; i++) {
    var x = 200
    var y = 200
    var distanceFromcentre = Math.random()*50+100
    particleArray1.push(new Particle(x,y,distanceFromcentre)) 
}
var particleArray2 = []
for (let i = 0; i <50; i++) {
    var x = 1300
    var y = 200
    var distanceFromcentre = Math.random()*50+100
    particleArray2.push(new Particle(x,y,distanceFromcentre)) 
}
function particle(){
    particleArray1.forEach(particle => { particle.update()})
    particleArray2.forEach(particle => { particle.update()}) 
}
function animate(){
    requestAnimationFrame(animate)
    c.fillStyle = 'rgba(255,255,255,0.05)'
    c.fillRect(0,0,canvas.width,350);
    c.clearRect(0,350,innerWidth,innerHeight-350)
//     boundaryLine()
    insertImage()
    setInterval(ballMovement(),7000)
    setInterval(ballGravity,7000)
    setInterval(particle ,10000);
}
animate()
