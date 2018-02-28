/**
 * Under engine
 * @classdesc Under engine main class
 * @implements {Engine}
 * @example
 * let engine = new UnderEngine("relative/path");
 * engine.setInput(new AllInput());
 * engine.setScreen(new GeneratableScreen());
 * engine.setSceneManager(new StackSceneManager());
 * engine.execute(new DefaultTitleScene());
 */
class UnderEngine extends Engine {
    /**
     * Under engine constructor
     * @constructor
     */
    constructor() {
        super();
        /**
         * Previous measurement time
         * @private
         * @type {number}
         */
        this.oldTime_;
    }

    /**
     * Execute engine
     * @override
     * @param {Scene} scene First scene
     */
    execute(scene) {
        // set access
        this.manager.setInput(this.input);
        this.input.setScreen(this.screen);
        // transition
        this.manager.replaceScene(scene);

        // start main loop
        let ctx = this.screen.getContext();
        this.oldTime_ = +new Date();
        this.render = _ => {
            requestAnimationFrame(this.render);
            // get scene
            let scene = this.manager.getScene();
            // update
            let newTime = +new Date();
            this.input.update();
            scene.update(newTime - this.oldTime_);
            this.oldTime_ = newTime;

            // draw
            ctx.save();
            ctx.scale(this.screen.gameSize, this.screen.gameSize);
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, this.screen.width, this.screen.height);
            scene.render(ctx);
            ctx.restore();
        };
        requestAnimationFrame(this.render);
    }
}