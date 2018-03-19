/**
 * Under engine
 * @implements {Engine}
 * @classdesc Under engine main class
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
     * Game main process
     * @override
     * @protected
     */
    main() {
        // start main loop
        this.oldTime_ = +new Date();
        this.render_ = (_) => {
            requestAnimationFrame(this.render_);
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
        requestAnimationFrame(this.render_);
    }
}
