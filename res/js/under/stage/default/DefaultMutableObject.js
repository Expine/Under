/**
 * Default mutable object sample
 * @implements {MmutableObject}
 * @classdesc Mutable object sample
 */
class DefaultMutableObject extends MutableObject {
    /**
     * Entity constructor
     * @constructor
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width object width
     * @param {number} height object height
     * @param {Image} image tile image
     * @param {RigidBody} body rigid body (if has not, undefined)
     */
    constructor(x, y, width, height, image, body) {
        super(x, y, image, body);
        /**
         * Object width
         * @protected
         * @type {number}
         */
        this.width = width;
        /**
         * Object height
         * @protected
         * @type {number}
         */
        this.height = height;
    }

    /**
     * Render entity
     * @override
     * @param {CanvasRenderingContext2D} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        ctx.drawImage(this.image, this.x + shiftX, this.y + shiftY, this.width, this.height);
    }
}