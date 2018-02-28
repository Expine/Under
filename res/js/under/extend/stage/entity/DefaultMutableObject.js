/**
 * Default mutable object sample
 * @implements {MmutableObject}
 * @classdesc Mutable object sample
 */
class DefaultMutableObject extends MutableObject {
    /**
     * Render entity
     * @override
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        ctx.drawImage(this.image, this.x + shiftX, this.y + shiftY, this.width, this.height);

        // for debug
        if (this.collider !== undefined)
            this.collider.render(ctx, shiftX, shiftY);
    }
}