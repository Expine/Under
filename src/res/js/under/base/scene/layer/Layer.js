/**
 * Layer
 * - ### Performs drawing processing collectively
 * @interface
 * @classdesc Layer to perform drawing processing collectively
 */
class Layer { // eslint-disable-line  no-unused-vars
    /**
     * Layer constructor
     * @constructor
     */
    constructor() {
        /**
         * Layer x position
         * @type {number}
         */
        this.x = 0;
        /**
         * Layer y position
         * @type {number}
         */
        this.y = 0;
        /**
         * Layer z position
         * @type {number}
         */
        this.z = 0;

        /**
         * Layer width
         * @protected
         * @type {number}
         */
        this.width = 0;
        /**
         * Layer height
         * @protected
         * @type {number}
         */
        this.height = 0;
    }

    /**
     * Set layer position
     * @param {number} x Layer x position
     * @param {number} y Layer y position
     * @param {number} z Layer z position
     */
    setPosition(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * Set layer size
     * @param {number} width Layer width
     * @param {number} height Layer height
     */
    setSize(width, height) {
        this.width = width;
        this.height = height;
    }

    /**
     * Initialize scene
     * @abstract
     */
    init() {}

    /**
     * Update layer
     * @abstract
     * @param {number} dt Delta time
     */
    update(dt) {}

    /**
     * Render layer
     * @abstract
     * @param {Context} ctx Canvas context
     */
    render(ctx) {}
}
