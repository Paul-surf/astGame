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
        force.mult(0.1)
        this.vel.add(force);
    }

    this.hits = function(asteroid) {
        var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
        if (d < this.r + asteroid.r) {
            return true;
        } else {
            return false;
        }
    }



    this.render = function () {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.heading + PI / 2);
        fill(100);
        stroke(150);
        triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
        fill(80)
        triangle(-this.r + 13.5, this.r - 25, this.r - 13.5, this.r - 25, 0, -this.r)
        fill('white')
        line(-this.r + 2, this.r- 20, -this.r + 2, this.r - 5)
        line(this.r - 2, this.r - 20, this.r - 2, this.r - 5)
        fill('black')
        stroke(200)
        line(0, this.r - 5, 0, this.r - 15)
        stroke(150)
        pop();
        if (isUp) {
            push();
            translate(this.pos.x, this.pos.y);
            rotate(this.heading + PI / 2);
            noStroke();
            fill('red')
            triangle(-this.r + 5, this.r, this.r - 5, this.r , 0, -this.r + 60);
            fill('orange');
            triangle(-this.r + 13, this.r, this.r - 13, this.r , 0, -this.r + 50);
            pop();
        }
    }

    this.movement = function () {
        if (isUp) {
            push();
            ship.boosting(true)
            pop();
         }
         ship.boosting(isUp);
       
        if (isRight) {
            ship.setRotation(0.1);
        }
        if (isLeft) {
            ship.setRotation(-0.1);
        }
        if (!isLeft && !isRight || isLeft && isRight) {
            ship.setRotation(0)
        }
        
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
}