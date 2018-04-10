/**
 * Under engine
 * - Control the core of the game
 * - Manages each piece of game information
 * - Fires update and rendering processing respectively
 * - ### Executes the main loop by requestAnimationFrame
 * @implements {Engine}
 * @classdesc Under engine to execute main loop by requestAnimationFrame
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
         * @protected
         * @type {number}
         */
        this.oldTime = +new Date();

        /**
         * Rendering lambda function
         * @protected
         * @type {lambda}
         */
        this.loop = null;
    }

    /**
     * Update in main loop
     * @protected
     */
    update() {
        let newTime = +new Date();
        this.timer.update(newTime - this.oldTime);
        this.input.update();
        // minimum delta time is 30 milisec
        this.manager.update(this.timer.deltaTime > 30 ? 30 : this.timer.deltaTime);
        this.oldTime = newTime;
    }

    /**
     * Rendering in main loop
     * @protected
     */
    render() {
        this.context.preRendering();
        this.manager.render(this.context);
        this.context.postRendering();
    }

    /**
     * Game main process
     * @override
     * @protected
     */
    main() {
        // start main loop
        this.oldTime = +new Date();
        this.loop = (_) => {
            requestAnimationFrame(this.loop);
            this.update();
            this.render();
        };
        requestAnimationFrame(this.loop);
    }
}
