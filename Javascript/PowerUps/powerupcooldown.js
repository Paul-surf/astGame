var colorTime3 = 255;
var colorTime4 = 100;
var c = false;
var d = false;



function PowerUpCooldown() {
    this.pos = createVector(random(width), random(height));
    this.r = 50;

    this.render = function() {

        if (this.pos.x < 200 || this.pos.x > width - 200 || this.pos.y < 100 || this.pos.y > height - 100) {
            this.pos = createVector(random(width), random(height));
        }

        if (colorTime3 > 1 && c == false) {
            colorTime3 = colorTime3 - 2.95;
            c = false;
        } else {
            c = true;
        }
        if (colorTime3 < 255 && c == true) {
            colorTime3 = colorTime3 + 2.95;
            c = true;
        } else {
            c = false;
        }

        push(); 
        translate(this.pos.x, this.pos.y);
        noStroke();
        fill(255 - colorTime3, 0, 0);
        rect(-5, 17, 10, 15);
        fill(0);
        rect(-5, 30, 10, 2);
        rect(-5, 21.33, 10, 1);
        rect(-5, 25.66, 10, 1);
        fill(255 - colorTime3, 0, 0);
        triangle(-7.5, -29, 0, -40, 7.5, -29)
        rect(-7.5, -30, 15, 30);
        fill(255 - colorTime3, 0, 0);
        stroke(2);
        arc(0, 0, 35, 35, -0.1, PI + 0.1, PIE);
        fill(255 - colorTime3);
        line(0, -5, 0, -25);
        pop();  
    }












}