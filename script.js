const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
console.log(ctx);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined,
    y: undefined,
}
// canvas.addEventListener('click', function(event){
//     mouse.x = event.x;
//     mouse.y = event.y;
//     for(let i = 0; i < 1; i++){
//         particlesArray.push(new Particle());
//     }
// });

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i = 0; i < 1; i++){
        particlesArray.push(new NewParticle());
    }

});

class NewParticle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 3 - 1.5;  // random number b/w  +1 and -1
        this.speedY = Math.random() * 3 - 1.5;
        // this.color = 'hsl(' + hue + ', 100%, 50%)';
        this.color = '#FFF';
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.2) this.size -= 0.1;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // drawStar(this.x, this.y, 5, 30, 15);
        ctx.fill();
    }
}


class Particle{
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 10 + 1;
        this.speedX = Math.random() * 3 - 1.5;  // random number b/w  +1 and -1
        this.speedY = Math.random() * 3 - 1.5;
        // this.color = 'hsl(' + hue + ', 100%, 50%)';
        this.color = '#FFD700';
    }
    update(){
        this.x += this.speedX/5;
        this.y += this.speedY/5;
        // if(this.size > 0.2) this.size -= 0.1;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // drawStar(this.x, this.y, 5, 30, 15);
        ctx.fill();
    }
}

function init(){
    for(let i = 0; i < 250; i++){
        particlesArray.push(new Particle());
    }
}
init();
// function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
//     var rot = Math.PI / 2 * 3;
//     var x = cx;
//     var y = cy;
//     var step = Math.PI / spikes;

//     ctx.strokeSyle = "#000";
//     ctx.beginPath();
//     ctx.moveTo(cx, cy - outerRadius)
//     for (i = 0; i < spikes; i++) {
//         x = cx + Math.cos(rot) * outerRadius;
//         y = cy + Math.sin(rot) * outerRadius;
//         ctx.lineTo(x, y)
//         rot += step

//         x = cx + Math.cos(rot) * innerRadius;
//         y = cy + Math.sin(rot) * innerRadius;
//         ctx.lineTo(x, y);
//         rot += step
//     }
//     ctx.lineTo(cx, cy - outerRadius);
//     ctx.closePath();
//     ctx.lineWidth=5;
//     ctx.strokeStyle='#FFD700';
//     ctx.stroke();
//     ctx.fillStyle='#ffe866';
//     ctx.fill();
// }


function handleParticles(){
    for(let i = 0; i< particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();

        for(let j = i; j < particlesArray.length; j++){
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if(distance < 100){
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                // ctx.strokeStyle ='#FFD700';
                ctx.lineWidth = 0.3;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
        if(particlesArray[i].size <= 0.5){
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = 'rgba(0,0,0,0.02)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue+=2;
    requestAnimationFrame(animate);
}
animate();