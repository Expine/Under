/**
 * Delay event
 * - Updates and renders event
 * - ### Delaies time
 * @classdesc Delay event to delay time
 */
class DelayEvent extends GameEvent { // eslint-disable-line  no-unused-vars
    /**
     * Delay event constructor
     * @constructor
     * @param {number} delay Delay time
     */
    constructor(delay) {
        super();

        /**
         * Delay time
         * @protected
         * @type {number}
         */
        this.delay = delay;

        /**
         * Delay count
         * @protected
         * @type {number}
         */
        this.count = 0;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        this.count = 0;
    }

    /**
     * Update event
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        this.count += dt / 1000;
        if (this.count > this.delay) {
            this.op.stopUpdate(this);
            this.op.stopRender(this);
            this.op.next();
        }
    }
}
