/**
 * Under engine
 * @classdesc Under engine main class
 * @implements {Engine}
 * @example
 * let engine = new UnderEngine("relative/path");
 * engine.setInput(new AllInput());
 * engine.setScreen(new GeneratableScreen());
 * engine.setContext(new JSContext());
 * engine.setSceneManager(new StackSceneManager());
 * engine.execute(new DefaultTitleScene());
 */
class UnderEngine extends Engine { // eslint-disable-line  no-unused-vars
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
        super.execute(scene);
        // transition
        this.manager.replaceScene(scene);

        // start main loop
        this.oldTime_ = +new Date();
        this.render = (_) => {
            requestAnimationFrame(this.render);
            // update
            let newTime = +new Date();
            window.deltaTime = newTime - this.oldTime_;
            this.input.update();
            this.manager.update(window.deltaTime > 30 ? 30 : window.deltaTime);
            this.oldTime_ = newTime;

            // draw
            this.context.preRendering();
            this.manager.render(this.context);
            this.context.postRendering();
        };
        requestAnimationFrame(this.render);
    }
}
