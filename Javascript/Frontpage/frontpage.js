var ship1;
var ship2;
var asteroids = [];
var k = 0;
var shieldTime = 1;
var isUp = false;



function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent(frontpage);
    bg = loadImage('pictures/galaxy.jpg');
    ship1 = new Ship2();
    ship2 = new Ship3();

    while (k < 10){
        k++;
        asteroids.push(new Asteroid());
    }
}

function draw() {
    background(bg);
    
    for (var i = 0; i < asteroids.length; i++) {
        asteroids[i].position();
        asteroids[i].update();
        asteroids[i].edges();
    }

    push(); 
    textAlign(CENTER);
    textSize(75);
    fill('Yellow');
    text('Asteroids', width/2, height/5 - 50);
    pop();  

    push();
    textAlign(CENTER);
    textSize(35);
    fill('Yellow');
    text('Made by Malthe A, Daniel Y & Philip U', width/2, height/5);
    pop();

    push();
    textAlign(LEFT);
    textSize(25);
    fill('Yellow');
    text('W  -  Forward', width/2 - 75, height/5 + 300);
    text('A  -  Left', width/2 - 75, height/5 + 330);
    text('D  -  Right', width/2 - 75, height/5 + 360);
    text('Space  -  Shoot', width/2 - 75, height/5 + 390);
    text('C  -  Ability', width/2 - 75, height/5 + 420);
    pop();

    push();
    stroke('Yellow');
    strokeWeight(2);
    line(width/2 - 120, height/5 + 270, width/2 - 120, height/5 + 430);
    line(width/2 + 120, height/5 + 270, width/2 + 120, height/5 + 430); 
    line(width/2 - 120, height/5 + 270, width/2 + 120, height/5 + 270); 
    line(width/2 - 120, height/5 + 430, width/2 + 120, height/5 + 430); 
    pop();

    ship1.render();
    ship2.render();
}