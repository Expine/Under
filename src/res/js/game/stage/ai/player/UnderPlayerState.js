/**
 * Under player state
 * Render entity by entity own image ID for change type
 * @implements {TransferableState}
 * @classdesc Under player state to render entity by entity own image ID
 */
class UnderPlayerState extends TransferableState { // eslint-disable-line  no-unused-vars
    /**
     * Render entity by this state
     * @override
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        if (this.stateAnimation !== null) {
            // set direction
            this.stateAnimation.setName(`${this.entity.directionX}-${this.entity.directionY}`);
            // render
            this.stateAnimation.render(ctx, this.entity.x + shiftX, this.entity.y + shiftY, this.entity.width, this.entity.height, this.entity.imageID);
        }
    }
}
