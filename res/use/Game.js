class TitleScene extends Scene {
    render(ctx) {
        ctx.fillStyle = "white"
        ctx.font = "50px Arial"
        ctx.fillText("Press to Start", 400, 300)
    }
}
// create engine
let engine = new UnderEngine("res/js");
engine.source.addSource("scene/TitleScene.js")

// execute
window.setTimeout(() => {
    engine.execute(new TitleScene());
}, 100);
