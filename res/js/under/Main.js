/**
 * Under engine
 * @classdesc Under engine main class
 * @example
 * let engine = new UnderEngine("relative/path");
 * engine.setInput(new DefaultInput());
 * engine.setScreen(new DefaultScreen());
 * engine.execute(new DefaultScene());
 */
class UnderEngine {
    /**
     * Under engine constructor
     * @constructor
     * @param {string} root  under engine root path
     */
    constructor(root) {
        /**
         * Previous measurement time
         * @private
         * @type {number}
         */
        this.oldTime_;

        /**
         * Game canvas
         * @private
         * @type {Canvas}
         */
        this.canvas_;
        if (document.querySelector("canvas") == null) {
            // generate canvas
            this.canvas_ = document.createElement("canvas");
            // set canvas
            let div = document.createElement("div");
            div.setAttribute("tabindex", "1");
            div.setAttribute("id", "UnderCanvasDiv");
            div.appendChild(this.canvas_);
            document.body.appendChild(div);
        } else {
            this.canvas_ = document.querySelector("canvas");
        }
        this.canvas_.id = "UnderCanvas";

        /**
         * Canvas context
         * @private
         * @type {CanvasRenderingContext2D}
         */
        this.ctx_ = this.canvas_.getContext("2d");
    }

    /**
     * Execute engine
     * @param {Scene} scene Init scene
     */
    execute(scene) {
        this.transition(scene);
        this.oldTime_ = +new Date();

        this.render = _ => {
            requestAnimationFrame(this.render);
            // update
            let newTime = +new Date();
            this.input_.update();
            this.scene_.update(newTime - this.oldTime_);
            this.oldTime_ = newTime;

            // draw
            this.ctx_.save();
            this.ctx_.scale(this.screen_.gameSize, this.screen_.gameSize);
            this.ctx_.fillStyle = "black";
            this.ctx_.fillRect(0, 0, this.screen_.width, this.screen_.height);
            this.scene_.render(this.ctx_);
            this.ctx_.restore();
        };
        requestAnimationFrame(this.render);
    }

    /**
     * Transition scene
     * @param {Scene} scene scene for transition
     */
    transition(scene) {
        /**
         * Game scene instance
         * @private
         * @type {Scene}
         */
        this.scene_ = scene;
        scene.setInput(this.input_);
    }

    /**
     * Set input system
     * @private
     * @param {Input} input input system
     */
    setInput(input) {
        /**
         * Input system instance
         * @private
         * @type {Input}
         */
        this.input_ = input;
        input.setTarget(this.canvas_);
        input.setScreen(this.screen_);
    }

    /**
     * Set screen system
     * @private
     * @param {Screen} screen
     */
    setScreen(screen) {
        /**
         * Screen information
         * @type {Screen}
         */
        this.screen_ = screen;
        screen.setCanvas(this.canvas_);
        // set screen on input
        if (this.input_ !== undefined)
            this.input_.setScreen(screen);
    }
}