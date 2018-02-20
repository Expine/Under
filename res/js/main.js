let gamensize = 1;
window.cameraX = 0;
window.cameraY = 0;
const canvas = document.getElementById("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");
// const scene = createScene();

let mouseX = 0;
let mouseY = 0;

const render = _ => {
    requestAnimationFrame(render);
    ctx.save();
    ctx.scale(gamensize, gamensize);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,800,600);
//    scene.draw(ctx)
    ctx.drawRe
    ctx.restore();

};

canvas.onmousemove = e => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
};

requestAnimationFrame(render);


document.onmousedown = e => {
//    scene.onMouseDown(e);
};

document.onkeydown = e => {
//    scene.onKeyDown(e);
};

(window.onresize = () => {
    gamensize = Math.min((innerWidth - 16) / 800,(innerHeight - 16) / 600);
    canvas.width = gamensize * 800;
    canvas.style.width = canvas.width + "px";
    canvas.height = gamensize * 600;
    canvas.style.height = canvas.height + "px";
})();