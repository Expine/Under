/**
 * Under engine
 * @classdesc Under engine main class
 * @extends Engine
 * @example
 * let engine = new UnderEngine("relative/path");
 * engine.setInput(new DefaultInput());
 * engine.setScreen(new DefaultScreen());
 * engine.setSceneManager(new StackSceneManager());
 * engine.execute(new DefaultScene());
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
     * Set input system
     * @param {Input} input Input system
     */
    setInput(input) {
        /**
         * Input system instance
         * @private
         * @type {Input}
         */
        this.input_ = input;
    }

    /**
     * Set screen system
     * @param {Screen} screen Screen system
     */
    setScreen(screen) {
        /**
         * Screen information
         * @private
         * @type {Screen}
         */
        this.screen_ = screen;
    }

    /**
     * Set scene manager
     * @param {SceneManager} manager Scene manager
     */
    setSceneManager(manager) {
        /**
         * Scene manager
         * @private
         * @type {SceneManager}
         */
        this.manager_ = manager;
    }

    /**
     * Execute engine
     * @param {Scene} scene First scene
     */
    execute(scene) {
        // set access
        this.manager_.setInput(this.input_);
        this.input_.setScreen(this.screen_);
        // transition
        this.manager_.replaceScene(scene);

        this.oldTime_ = +new Date();

        // start main loop
        let ctx = this.screen_.getContext();
        this.render = _ => {
            requestAnimationFrame(this.render);
            let scene = this.manager_.getScene();
            // update
            let newTime = +new Date();
            this.input_.update();
            scene.update(newTime - this.oldTime_);
            this.oldTime_ = newTime;

            // draw
            ctx.save();
            ctx.scale(this.screen_.gameSize, this.screen_.gameSize);
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, this.screen_.width, this.screen_.height);
            scene.render(ctx);
            ctx.restore();
        };
        requestAnimationFrame(this.render);
    }
}