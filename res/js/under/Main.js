/**
 * Under engine
 * @classdesc Under engine main class
 * @example
 * let engine = new UnderEngine("relative/path");
 * engine.setInput(new DefaultInput());
 * engine.execute(new DefaultScene());
 */
class UnderEngine {
    /**
     * Under engine constructor
     * @constructor
     * @param {string} root  under engine root path
     * @param {number} [width = 800]  screen width
     * @param {number} [height = 600]  screen height
     */
    constructor(root, width = 800, height = 600) {
        /**
         * Game screen ratio
         * @private
         * @type {number}
         */
        this.gameSize_ = 1;
        /**
         * Game screen width size
         * @private
         * @type {number}
         */
        this.width_ = width;
        /**
         * Game screen height size
         * @private
         * @type {number}
         */
        this.height_ = height;
        /**
         * Previous measurement time
         * @private
         * @type {number}
         */
        this.oldTime_;

        // generate style
        let style = document.createElement("style");
        style.append("canvas {display:block;width: " + width + "px;height: " + height + "px;margin: 0px auto;}");
        document.head.appendChild(style);

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
        this.canvas_.width = width;
        this.canvas_.height = height;
        this.canvas_.setAttribute("style", "canvas");


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
            this.ctx_.scale(this.gameSize_, this.gameSize_);
            this.ctx_.fillStyle = "black";
            this.ctx_.fillRect(0, 0, this.width_, this.height_);
            this.scene_.render(this.ctx_);
            this.ctx_.restore();
        };
        requestAnimationFrame(this.render);

        (window.onresize = () => {
            /*
            this.gameSize_ = Math.min((innerWidth - 16) / this.width_, (innerHeight - 16) / this.height_);
            this.canvas_.width = this.gameSize_ * this.width_;
            this.canvas_.style.width = this.canvas_.width + "px";
            this.canvas_.height = this.gameSize_ * this.height_;
            this.canvas_.style.height = this.canvas_.height + "px";
            */
        })();
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
        input.setEngine(this);
    }

    /**
     * Get game screen ratio
     * @return {number} game screen ratio
     */
    getGameSize() {
        return gameSize_;
    }
}