/**
 * Entity
 * Object present on the stage
 * Has coordinates and sizes
 * May have collider and images
 * @classdesc Stage entity
 */
class Entity {
    /**
     * Entity constructor
     * @constructor
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width object width
     * @param {number} height object height
     * @param {Image} image image (if has not, undefined)
     */
    constructor(x, y, width, height, image) {
        /**
         * Entity x position
         * @protected
         * @type {number}
         */
        this.x = x;
        /**
         * Entity y position
         * @protected
         * @type {number}
         */
        this.y = y;
        /**
         * Entity width
         * @protected
         * @type {number}
         */
        this.width = width;
        /**
         * Entity height
         * @protected
         * @type {number}
         */
        this.height = height;
        /**
         * Entity image
         * @protected
         * @type {Image}
         */
        this.image = image;
    }

    /**
     * Set collider
     * @param {Collider} collider collider
     */
    setCollider(collider) {
        /**
         * Entity collider
         * @protected
         * @type {Collider}
         */
        this.collider = collider;
    }

    /**
     * Update entty
     * @interface
     * @param {number} dt - delta time
     */
    update(dt) {}

    /**
     * Render entity
     * @interface
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {}
}