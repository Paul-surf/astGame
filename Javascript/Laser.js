const { STROKE } = require("../p5lib/p5");

function laserLeft(lpos) {
    this.pos = createVector(lpos.x, lpos.y);
    this.vel = createVector();

    this.update = function() {
        this.pos.add(this.vel);
    }
    this.render = function() {
        push();
        STROKE(255);
        strokeweight(4);
        point(this.pos.x, this.pos.y);
        pop();
    }



}
function laserRight(rpos) {
    this.pos = createVector(rpos.x, rpos.y);
    this.vel = createVector();
}