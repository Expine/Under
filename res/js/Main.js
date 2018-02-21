// create engine
let engine = new UnderEngine("res/js");
engine.source.addSource("scene/TitleScene.js")

// execute
window.setTimeout(() => {
    engine.execute(new TitleScene());
}, 100);