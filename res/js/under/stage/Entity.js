/**
 * Entity
 * @classdesc Stage entity base class
 */
class Entity {
    /**
     * Entity constructor
     * @constructor
     * @param {number} x - x position
     * @param {number} y - y position
     * @param {Image} image - image (if has not, undefined)
     * @param {RigidBody} body - rigid body (if has not, undefined)
     */
    constructor(x, y, image, body) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.body = body;
    }

    /**
     * Update entty
     * @param {number} dt - delta time
     */
    update(dt) {}

    /**
     * Render entity
     * @param {CanvasRenderingContext2D} ctx - canvas context
     */
    render(ctx) {
        if (this.image !== undefined)
            ctx.drawImage(this.image, this.x, this.y);
    }
}