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
            this.timer.update(newTime - this.oldTime_);
            this.timer.startTimer(`update`);
            this.input.update();
            this.manager.update(window.deltaTime > 30 ? 30 : this.timer.deltaTime);
            this.oldTime_ = newTime;
            this.timer.stopTimer(`update`);

            // draw
            this.timer.startTimer(`render`);
            this.context.preRendering();
            this.manager.render(this.context);
            this.context.postRendering();
            this.timer.stopTimer(`render`);
        };
        requestAnimationFrame(this.render_);
    }
}
