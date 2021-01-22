var colorTime1 = 255;
var b = false;

function PowerUpHeal(pos, r) {
    if (pos) {
        this.pos = pos.copy();
    } else {
        this.pos = createVector(random(width), random(height))
    }
    if (r) {
        this.r = 50;
    } else {
        this.r = 50;
    }




    this.render = function() {

        if (this.pos.x < 200 || this.pos.x > width - 200 || this.pos.y < 100 || this.pos.y > height - 100) {
            this.pos = createVector(random(width), random(height));
        }

        if (colorTime1 > 1 && b == false) {
            colorTime1 = colorTime1 - 3;
            b = false;
        } else {
            b = true;
        }
        if (colorTime1 < 255 && b == true) {
            colorTime1 = colorTime1 + 3;
            b = true;
        } else {
            b = false;
        }
        push(); 
        translate(this.pos.x, this.pos.y);
        fill(0, 255 - colorTime1, 100 - colorTime1); 
        noStroke();
        rect(-7.5, -15, this.r - 35, this.r); 
        rect(-20, -5, this.r - 10, this.r - 35);
        pop();
    }

}

