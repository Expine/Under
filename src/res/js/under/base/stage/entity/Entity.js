/**
 * Entity
 * - ### Object present on the stage that has coordinate and size
 * @interface
 * @classdesc Entity that has coordinate and size
 */
class Entity { // eslint-disable-line  no-unused-vars
    /**
     * Entity constructor
     * @constructor
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} width Entity width
     * @param {number} height Entity height
     */
    constructor(x, y, width, height) {
        /**
         * Entity x position
         * @type {number}
         */
        this.x = x;
        /**
         * Entity Y position
         * @type {number}
         */
        this.y = y;
        /**
         * Entity width
         * @type {number}
         */
        this.width = width;
        /**
         * Entity height
         * @type {number}
         */
        this.height = height;

        /**
         * Stage instance
         * @type {Stage}
         */
        this.stage = null;
    }

    /**
     * Set stage
     * @param {Stage} stage  Stage instance
     */
    setStage(stage) {
        this.stage = stage;
    }

    /**
     * Initialize entity
     * @abstract
     */
    init() {}

    /**
     * Update entty
     * @abstract
     * @param {number} dt Delta time
     */
    update(dt) {}

    /**
     * Render entity
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {}
}
