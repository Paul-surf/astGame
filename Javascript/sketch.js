var ship;                           // ! DO NOT TOUCH ! Variable for the ship
var asteroids = [];                 // ! DO NOT TOUCH ! Array for the amount of Asteroids
var lasers = [];                    // ! DO NOT TOUCH ! Array for the amount Lasers
var isRight = false;                // ! DO NOT TOUCH ! Boolean for the Right function
var isLeft = false;                 // ! DO NOT TOUCH ! Boolean for the Left function
var isUp = false;                   // ! DO NOT TOUCH ! Boolean for the Forward function
var isShooting = false;             // ! DO NOT TOUCH ! Boolean for the Shooting function
var bg;                             // ! DO NOT TOUCH ! Variable for the picture in the background
var score = 0;                      // ! DO NOT TOUCH ! The same as "realscore", but with a lot of decimals
var realscore = score.toFixed(2);   // ! DO NOT TOUCH ! This variable is the one that shows the current score with two decimals on the screen
var multiplier = 0;                 // ! DO NOT TOUCH ! The variable that shows the amount of multiplier on the screen
var k = 0;                          // ! DO NOT TOUCH ! This is the variable 
var perlevel = 0;                   // ! DO NOT TOUCH ! The total amount of Astroids added every level. This value changes everytime the level changes.
var level = 1;                      // ! DO NOT TOUCH ! What level you are on

var start = 5;                      // The amount of Asteroids that spawn at the start of the game.
var AddAsteroid = 10;               // How many Asteroids that spawn + the start variable
var perMultiplier = 1.01;           // How much the score multiplies every time an asteroid is destroyed

document.getElementById("level").innerHTML = +level;
document.getElementById("realscore").innerHTML = +realscore;
document.getElementById("multiplier").innerHTML = +multiplier;

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent(game)
    bg = loadImage('pictures/galaxy.jpg')
    ship = new Ship();
    
    while (k < start){
        k++;
        asteroids.push(new Asteroid());
        var aAmount = asteroids.length;
        document.getElementById("aAmount").innerHTML = +aAmount;
        console.log(asteroids.length);
    }
}


function draw() {
    background(bg);
    
    aAmount = asteroids.length;
    document.getElementById("aAmount").innerHTML = +aAmount;

    if (asteroids.length == 0) {
        perlevel = perlevel + AddAsteroid;
        level = level + 1;
        document.getElementById("level").innerHTML = +level;
        while (asteroids.length < (start + perlevel)) {
            asteroids.push(new Asteroid());
        }
    }

    for (var i = 0; i < asteroids.length; i++) {
        if (ship.hits(asteroids[i])) {
            //location.reload();
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
                        aAmount = asteroids.length;
                        document.getElementById("aAmount").innerHTML = +aAmount;
                    }
                    if (asteroids[j].r <= 20) {
                        aAmount = asteroids.length;
                        console.log(asteroids.length);
                        document.getElementById("aAmount").innerHTML = +aAmount;
                    }
                    asteroids.splice(j, 1);
                    score = score + 1;
                    score = score * perMultiplier;
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

// Tallene betyder W A S D
// W = 87
// A = 65
// S = 83
// D = 68
