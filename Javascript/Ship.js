// This function is used to make the ship inside the "Sketch.js"
function Ship() { 
    this.pos = createVector(width / 2, height / 2)              // Creates the x and y in the middle of the screen
    this.r = 20                                                 // The radius
    this.heading = 0;                                           // The direction it is facing
    this.rotation = 0                                           // This makes it turn
    this.vel = createVector(0, 0)                               // This creates x and y in 0, 0
    this.isBoosting = false;                                    // Boolean to set isBoosting to false

    this.boosting = function (b) {                              // Makes this.boosting into a function that is equal to this.isBoosting
        this.isBoosting = b;
    }

    this.update = function () {                                 // This function updates the movement
        if (this.isBoosting) {                                  // checks is the boolean value has changed to true
            this.boost();
        }
        this.pos.add(this.vel)
        this.vel.mult(0.99)

    }

    this.boost = function () {                                  // This is the boost function that is used in the update function.
        var force = p5.Vector.fromAngle(this.heading);          // This is what makes it move
        force.mult(0.1)                                         // Multiplies "Force" by 0.1 to make it way slower
        this.vel.add(force);                                    // This is what makes it move
    }

    this.hits = function(asteroid) {                            // This is the function that is used in "sketch.js", to detect collision
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        if (d < this.r + asteroid.r) {                          
            return true;
        } else {
            return false;
        }
    }
    this.touch = function(power) {
        if (dist(power.pos.x, power.pos.y, this.pos.x, this.pos.y) < (power.r/2)) {                         
            return true;
        } else {
            return false;
        }
    }


    this.render = function () {                                  // This function creates the ship
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.heading + PI / 2);
        if (shieldTime > 0) {
            shieldTime--;
        }
        fill(100);
        stroke(150);
        if (shieldTime > 0) {
            fill(0, 200, 255, 70);
            stroke(0, 50, 255)
            circle(0, 5, 90);
        }
        fill(100);
        stroke(150);
        triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
        stroke(150)
        fill(80)
        triangle(-this.r + 13.5, this.r - 25, this.r - 13.5, this.r - 25, 0, -this.r)
        stroke(150)
        fill('white')
        line(-this.r + 2, this.r- 20, -this.r + 2, this.r - 5)
        line(this.r - 2, this.r - 20, this.r - 2, this.r - 5)
        fill('black')
        stroke(200)
        line(0, this.r - 5, 0, this.r - 15)
        stroke(150)
        pop();
        if (isUp) {                                              // Checks if the boolean variable "isUp" is true
            push();
            translate(this.pos.x, this.pos.y);
            rotate(this.heading + PI / 2);
            noStroke();
            fill('red')
            triangle(-this.r + 5, this.r, this.r - 5, this.r , 0, -this.r + 65);
            fill('orange');
            triangle(-this.r + 13, this.r, this.r - 13, this.r , 0, -this.r + 55);
            pop();
        }
    }

    this.movement = function () {                               // This is the function that controls the ship's turning and movement 
        if (isUp) {
            push();
            ship.boosting(true)
            pop();
         }
         ship.boosting(isUp);
       
        if (isRight) {
            ship.setRotation(0.075);
        }
        if (isLeft) {
            ship.setRotation(-0.075);
        }
        if (!isLeft && !isRight || isLeft && isRight) {
            ship.setRotation(0)
        }
        
    }

    this.edges = function () {                                    // If the asteroids leave the screen the are moved to the other side, to keep them on the screen
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
    this.shield = function () {
        if (shieldTime > 0) {
            return true;
        } else {
            return false;
        }
    }
}