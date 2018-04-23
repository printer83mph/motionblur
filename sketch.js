var plyPos;
var plyVel;

var clickedThingy, randPoint;

var thingies = [];

// ---------------------------------------------------------------------

function Thingy(x,y) {
	this.pos = new Vector(x,y);
	this.vel = new Vector(0,0);
	
	this.update = function() {
		this.vel.mul(0.9);
		this.pos.addVec(this.vel);
		if(clickedThingy != this) {
			if(this.pos.x > width+15) {this.pos.x = -15;}
			else if(this.pos.x < -15) {this.pos.x = width+15;}
			if(this.pos.y > height+15) {this.pos.y = -15;}
			else if(this.pos.y < -15) {this.pos.y = height+15;}
		}
	}
	
	this.draw = function() {
		ctx.ellipse(this.pos.x,this.pos.y,15,15,0,0,2*Math.PI,0);
		for(var i = 10; i < 100; i += 10) {
			ctx.strokeStyle = "rgba(255,255,255," + (0.5-(i/200)) + ")";
			ctx.beginPath();
			var ellipsePos = this.pos.getAddVec(this.vel.getMul(i/100));
			var negEllipsePos = this.pos.getAddVec(this.vel.getMul(i/-100));
			ctx.ellipse(negEllipsePos.x,negEllipsePos.y,15,15,0,0,2*Math.PI,0);
			
			ctx.ellipse(ellipsePos.x,ellipsePos.y,15,15,0,0,2*Math.PI,0);
			if((thingies[thing].pos.getDisVec(mousePos) < 15 && !clickedThingy) || clickedThingy == this) {
				ctx.fillStyle = "rgba(255,255,255," + (0.5-(i/200)) + ")";
				ctx.fill();
			} else {
				ctx.stroke();
			}
		}
	}
	
	this.follow = function(vec) {
		this.vel.addVec(vec.getAddVec(this.pos.getMul(-1)).getMul(0.08));
		this.vel.mul(0.9);
	}
}


// ---------------------------------------------------------------------

function setup() {
	thingies.push(new Thingy(width/2,height/2));
	thingies.push(new Thingy(width/3,height/3));
	canvas.addEventListener("click",mouseGrab);
	randPoint = new Vector(200,200);
}

function update() {
	for (thing in thingies) {
		thingies[thing].update();
	}
	if(clickedThingy) {clickedThingy.follow(mousePos);}
	if(frameCount % 60 == 0) {
		randPoint.x = Math.random()*800;
		randPoint.y = Math.random()*800;
	}
}

function draw() {
	ctx.fillStyle = "rgba(0,0,0,1)";
	ctx.fillRect(0,0,width,height);
	for(thing in thingies) {
		thingies[thing].draw();
	}
	if(!clickedThingy) {
		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.ellipse(mousePos.x,mousePos.y,2,2,0,0,2*Math.PI,0);
		ctx.fill();
	}
}

function mouseGrab(evt) {
	if(clickedThingy) {
		clickedThingy = null;
	} else {
		for(thing in thingies) {
			if(thingies[thing].pos.getDisVec(mousePos) < 15) {
				clickedThingy = thingies[thing];
			}
		}
	}
}