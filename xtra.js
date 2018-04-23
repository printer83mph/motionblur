
var canvas, ctx, width, height, mousePos, frameCount, frameRate;

window.onload = function() {
	canvas = document.getElementById("canvas");
	if(canvas.getContext) {
		ctx = canvas.getContext("2d");
	}
	
	width = canvas.width;
	height = canvas.height;
	
	mousePos = new Vector(width/2,height/2);
	
	frameRate = 60;
	frameCount = 0;
	
	canvas.addEventListener("mousemove",function(evt) {
		var pos = getMousePos(canvas,evt);
		mousePos.x = pos.x;
		mousePos.y = pos.y;
	});
	
	setup();
	
	setInterval(function() {
		update();
		draw();
		frameCount++;
	},1000/frameRate);
}

// -------------------------------------------------------------------

function Vector(x,y) {
	this.x = x || 0;
	this.y = y || 0;
}

Vector.prototype.getMagnitude = function() {
	return(Math.sqrt(this.x**2 + this.y**2));
}

Vector.prototype.setMagnitude = function(mag) {
	var dir = this.magnitude();
	this.x = Math.cos(dir) * mag;
	this.y = Math.sin(dir) * mag;
}

Vector.prototype.getAngle = function() {
	return(Math.atan(this.y/this.x));
}

Vector.prototype.setAngle = function(angle) {
	var mag = this.magnitude();
	this.x = Math.cos(angle) * mag;
	this.y = Math.sin(angle) * mag;
}

Vector.prototype.addVec = function(vec) {
	this.x += vec.x;
	this.y += vec.y;
}

Vector.prototype.add = function(x,y) {
	this.x += x;
	this.y += y;
}

Vector.prototype.getAddVec = function(vec) {
	return(new Vector(this.x+vec.x,this.y+vec.y));
}

Vector.prototype.mulVec = function(vec) {
	this.x *= vec.x;
	this.y *= vec.y;
}

Vector.prototype.getMulVec = function(vec) {
	return(new Vector(this.x*vec.x,this.y*vec.y));
}

Vector.prototype.mul = function(fac) {
	this.x *= fac;
	this.y *= fac;
}

Vector.prototype.getMul = function(fac) {
	return(new Vector(this.x*fac,this.y*fac));
}

Vector.prototype.getDis = function(x,y) {
	return(Math.sqrt((this.x-x)**2)+Math.sqrt((this.y-y)**2));
}

Vector.prototype.getDisVec = function(vec) {
	return(this.getDis(vec.x,vec.y));
}

// -------------------------------------------------------------------

function getMousePos(canvas,e) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: e.clientX - rect.left,
		y: e.clientY - rect.top
	}
}

