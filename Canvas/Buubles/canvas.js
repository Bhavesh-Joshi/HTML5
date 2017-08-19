var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth-10;
canvas.height = window.innerHeight-200;

var c = canvas.getContext('2d');

var mouse = {
    x:undefined,
    y:undefined
}

window.addEventListener('mousemove', function(event){
   mouse.x = event.x;
   mouse.y = event.y;

})

var colorArray = [
    '#8F98A3',
    '#012141',
    '#024673',
    '#04608B',
    '#BF1C18'
];



function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random()*colorArray.length)];

    this.draw = function(){

        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function(){

        if(this.x+this.radius>canvas.width || this.x-this.radius<0){
            this.dx = -this.dx;
        }
        if(this.y+this.radius>canvas.height || this.y-this.radius<0){
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;


        //interactivity

        if(mouse.x-this.x<50 && mouse.x-this.x>-50 && mouse.y-this.y<50 && mouse.y -this.y>-50){
            if(this.radius<40){
                this.radius += 1;
            }
        }
        else if(this.radius>this.minRadius){
            this.radius -= 1;
        }



        this.draw();
    }
}
var circleArray = [];


for(var i=0; i<1000; i++){
    var radius = Math.random()*3 + 1;

    var x = Math.random()*(canvas.width-2*radius)+radius;
    var y = Math.random()*(canvas.height-2*radius)+radius;
    var dx = (Math.random()-0.5)*4;
    var dy = (Math.random()-0.5)*4;
    circleArray.push(new Circle(x, y, dx, dy, radius));
}
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    for(var i=0; i<circleArray.length; i++){
        circleArray[i].update();
    }
}
animate();