var ship;
var asteroids = [];
var lasers = [];
var isRight = false;
var isLeft = false;
var isUp = false;


function setup() {
    let canvas = createCanvas(windowWidth -20 , windowHeight -20);
    ship = new Ship();
    for (var k = 0; k < 15; k++){
        asteroids.push(new Asteroid());
    }
}

function draw() {
    background(15);
    
    for (var i = 0; i < lasers.length; i++) {
        lasers[i].render();
        lasers[i].update(); 
        for (var j = 0; j < asteroids.length; j++) {
            if (lasers[i].hits(asteroids[i])) {
                

        }


        }
    }

    for (var i = 0; i < asteroids.length; i++) {
        asteroids[i].position();
        asteroids[i].update();
        asteroids[i].edges();
    }

    ship.render();
    ship.turn();
    ship.update();
    ship.edges();
    ship.movement();

}

function keyReleased() {
    if (keyCode == RIGHT_ARROW) {
        isRight = false
    }
    if (keyCode == LEFT_ARROW) {
        isLeft = false
    }
    if (keyCode == UP_ARROW) {
        isUp = false
    }
}

function keyPressed() {
    if (keyCode == RIGHT_ARROW) {
        isRight = true
    }
    if (keyCode == LEFT_ARROW) {
        isLeft = true
    }
    if (keyCode == UP_ARROW) {
        isUp = true
    }
    if (key == ' ') {
        lasers.push(new Laser(ship.pos, ship.heading));
    }

}


