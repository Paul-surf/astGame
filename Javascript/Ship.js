const { SHIFT, FILL, LINE_LOOP } = require("../p5lib/p5");

var ship;
var isRight = false;
var isLeft = false;
var isUp = false;
var leftLaser = false;
var rightLaser = false;
var laser = false;

function setup() {
    let canvas = createCanvas(windowWidth -20 , windowHeight -);
    ship = new Ship();
}

function draw() {
    background(15);
    ship.render();
    ship.turn();
    ship.update();
    ship.edges();
    ship.movement();
    ship.shooting();

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
    if (key == 'a') {
        leftLaser = true
    }
    if (key == 'd') {
        rightLaser = true
    }

}

function Ship() {
    this.pos = createVector(width / 2, height / 2)
    this.r = 20
    this.heading = 0;
    this.rotation = 0
    this.vel = createVector(0, 0)
    this.isBoosting = false;

    this.boosting = function (b) {
        this.isBoosting = b;
    }

    this.update = function () {
        if (this.isBoosting) {
            this.boost();
        }
        this.pos.add(this.vel)
        this.vel.mult(0.99)

    }

    this.boost = function () {
        var force = p5.Vector.fromAngle(this.heading);
        force.mult(0.2)
        this.vel.add(force);
    }


    this.render = function () {
        translate(this.pos.x, this.pos.y);
        rotate(this.heading + PI / 2);
        fill('grey')
        stroke(255);
        triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
        fill(80)
        triangle(-this.r + 13.5, this.r - 25, this.r - 13.5, this.r - 25, 0, -this.r)
        fill('white')
        line(-this.r + 2, this.r- 20, -this.r + 2, this.r - 5)
        line(this.r - 2, this.r - 20, this.r - 2, this.r - 5)
        fill('red')
        
    }

    this.edges = function () {
        if (this.pos.x > width + this.r) {
            this.pos.x = -this.r;
        } else if (this.pos.x < -this.r) {
            this.pos.x = width + this.r;
        }
        if (this.pos.y > height + this.r) {
            this.pos.y = -this.r;
        } else if (this.pos.y < -this.r) {
            this.pos.y = height + this.r;
        }
    }

    this.setRotation = function (a) {
        this.rotation = a;
    }

    this.turn = function () {
        this.heading += this.rotation;


    }

    this.movement = function () {
        if (isRight) {
            ship.setRotation(0.1);
        }
        if (isLeft) {
            ship.setRotation(-0.1);
        }
        if (!isLeft && !isRight || isLeft && isRight) {
            ship.setRotation(0)
        }
        if (isUp) {
           ship.boosting(true)
           triangle(-this.r + 5, this.r, this.r - 5, this.r , 0, -this.r + 60);
           fill('orange');
           triangle(-this.r + 13, this.r, this.r - 13, this.r , 0, -this.r + 50);
        }
        ship.boosting(isUp)
    }

        this.shooting = function () {
            if (leftLaser) {
                laser.push(new laserLeft());
            }
        }
}


function Asteroid() {
    this.pos = createVector(random(width), random(height))
    this.r = 50;

    this.render = function() {
        stroke(255);
        noFill();
        translate(this.pos.x, this.pos.y);
        ellipse(0, 0, this.r * 2);
    }
}