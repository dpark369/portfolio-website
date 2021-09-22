let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Resizes the  canvas and reinitialize the particle when resizing the browser
window.addEventListener('resize', function () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	lightParticles = [];
	initializeParticles();
});

//Animate when mouse or finger is down

window.addEventListener('mousedown', () => {
	isMouseDown = true;
});

window.addEventListener('mouseup', () => {
	isMouseDown = false;
});

window.addEventListener('touchstart', () => {
	isFingerDown = true;
});

window.addEventListener('touchend', () => {
	isFingerDown = false;
});

class Particle {
	constructor(x, y, radius, color) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
	}

	draw() {
		ctx.save();
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.shadowColor = this.color;
		ctx.shadowBlur = 15;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}
	update() {
		this.draw();
	}
}
// particle properties

let lightParticles = [];
let particleCount = 200;
let timer = 0;
let opacity = 1;
let speed = 0.0005;
let colors = ['#0952BD', '#A5BFF0', '#1B635D', '#6D409F', '#F2E8C9', '#F6B04A'];

let initializeParticles;
//creates particles using the properties above

(initializeParticles = function () {
	for (let i = 0; i < particleCount; i++) {
		let randomColorIndex = Math.floor(Math.random() * colors.length);
		let randomRadius = Math.random() * 2;

		let x = Math.random() * (canvas.width + 200) - (canvas.width + 200) / 2;
		let y = Math.random() * (canvas.width + 200) - (canvas.width + 200) / 2;
		lightParticles.push(
			new Particle(x, y, randomRadius, colors[randomColorIndex])
		);
	}
})();

//Runs the animation loop
function animate() {
	window.requestAnimationFrame(animate);
	ctx.save();
	if (isMouseDown === true || isFingerDown === true) {
		// Ease into the new opacity
		let desiredOpacity = 0.01;
		opacity += (desiredOpacity - opacity) * 0.03;
		ctx.fillStyle = 'rgba(18, 18, 18,' + opacity + ')';

		// Ease into the new speed
		let desiredSpeed = 0.012;
		speed += (desiredSpeed - speed) * 0.01;
		timer += speed;
	} else {
		// Ease back to the original opacity
		let originalOpacity = 1;
		opacity += (originalOpacity - opacity) * 0.01;
		ctx.fillStyle = 'rgba(18, 18, 18, ' + opacity + ')';

		// Ease back to the original speed
		let originalSpeed = 0.001;
		speed += (originalSpeed - speed) * 0.01;
		timer += speed;
	}

	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.translate(canvas.width / 2, canvas.height / 2);
	ctx.rotate(timer);

	for (let i = 0; i < lightParticles.length; i++) {
		lightParticles[i].update();
	}

	ctx.restore();
}

let isMouseDown = false;
let isFingerDown = false;

animate();
