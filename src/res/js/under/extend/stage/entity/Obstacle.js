/**
 * Obstacle
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - It can be collided because it has material and collider
 * - It is not fixed and can be moved
 * - ### Obstacle on the stage that renders simply
 * @implements {MutableEntity}
 * @classdesc Obstacle that renderes simply
 */
class Obstacle extends MutableEntity { // eslint-disable-line  no-unused-vars
    /**
     * Render entity
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        ctx.drawImage(this.imageID, this.x + shiftX, this.y + shiftY, this.width, this.height);
    }
}
