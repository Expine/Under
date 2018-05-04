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
     */
    constructor() {
        /**
         * Entity x position
         * @type {number}
         */
        this.x = 0;
        /**
         * Entity Y position
         * @type {number}
         */
        this.y = 0;
        /**
         * Entity Z position
         * @type {number}
         */
        this.z = 0;
        /**
         * Entity width
         * @type {number}
         */
        this.width = 0;
        /**
         * Entity height
         * @type {number}
         */
        this.height = 0;

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
     * Set entity position
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} z Z position
     */
    setPosition(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * Set entity size
     * @param {number} width Entity width
     * @param {number} height Entity height
     */
    setSize(width, height) {
        this.width = width;
        this.height = height;
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
