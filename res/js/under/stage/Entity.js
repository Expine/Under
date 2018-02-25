/**
 * Entity
 * @classdesc Stage entity base class
 */
class Entity {
    /**
     * Entity constructor
     * @constructor
     * @param {number} x x position
     * @param {number} y y position
     * @param {Image} image image (if has not, undefined)
     * @param {RigidBody} body rigid body (if has not, undefined)
     */
    constructor(x, y, image, body) {
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
         * Entity image
         * @protected
         * @type {Image}
         */
        this.image = image;
        /**
         * Entity rigid body
         * @protected
         * @type {RigidBody}
         */
        this.body = body;
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
     * @param {CanvasRenderingContext2D} ctx - canvas context
     */
    render(ctx) {}
}