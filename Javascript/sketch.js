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
    
    
    for (var i = 0; i < asteroids.length; i++) {
        if (ship.hits(asteroids[i])) {
            console.log('ooops!');
        }
        asteroids[i].position();
        asteroids[i].update();
        asteroids[i].edges();
    }

    for (var i = lasers.length-1; i >= 0; i--) {
        lasers[i].render();
        lasers[i].update();
        if (lasers[i].offscreen()) {
            lasers.splice(i, 1);
        } else {
            
            for (var j = asteroids.length- 1; j >= 0; j--) {
                if (lasers[i].hits(asteroids[j])) {
                    if (asteroids[j].r > 20) {
                        var newAsteroids = asteroids[j].breakup();
                        asteroids = asteroids.concat(newAsteroids);
                    }
                    asteroids.splice(j, 1);
                    lasers.splice(i, 1);
                    break;
                }
            }
        } 
        

 }

    ship.render();
    ship.turn();
    ship.update();
    ship.edges();
    ship.movement();

}

function keyReleased() {
    if (keyCode == 68) {
        isRight = false
    }
    if (keyCode == 65) {
        isLeft = false
    }
    if (keyCode == 87) {
        isUp = false
    }
}

function keyPressed() {
    if (keyCode == 68) {
        isRight = true
    }
    if (keyCode == 65) {
        isLeft = true
    }
    if (keyCode == 87) {
        isUp = true
    }
    if (key == ' ') {
        lasers.push(new Laser(ship.pos, ship.heading));
    }
}

// Tallende betyder W A S D
// W = 87
// A = 65
// S = 83
// D = 68
