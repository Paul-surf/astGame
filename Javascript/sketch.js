var ship;
var asteroids = [];
var lasers = [];
var isRight = false;
var isLeft = false;
var isUp = false;
var isShooting = false;
var bg;
var score = 0;
var realscore = score.toFixed(2);
var multiplier = 0

document.getElementById("realscore").innerHTML = +realscore;
document.getElementById("multiplier").innerHTML = +multiplier;


function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent(game)
    bg = loadImage('pictures/galaxy.jpg')
    ship = new Ship();
    for (var k = 0; k < 25; k++){
        asteroids.push(new Asteroid());
    }
}

function draw() {
    background(bg);
    



    for (var i = 0; i < asteroids.length; i++) {
        if (ship.hits(asteroids[i])) {
            console.log('ooops!');
            location.reload();
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
                    score = score + 1;
                    score = score * 1.01;
                    realscore = score.toFixed(2);
                    document.getElementById("realscore").innerHTML = +realscore;
                    multiplier = multiplier + 10;
                    document.getElementById("multiplier").innerHTML = +multiplier;
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


    /* if (isShooting) {
            lasers.push(new Laser(ship.pos, ship.heading));
    } else {
        isShooting = false;
    }


    */
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
    if (key == ' ') {
        isShooting = false
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
        //isShooting = true¨
        lasers.push(new Laser(ship.pos, ship.heading));
    }
}

// Tallende betyder W A S D
// W = 87
// A = 65
// S = 83
// D = 68
