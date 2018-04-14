/**
 * Under player state
 * - Determines the operation by AI according to the state and renders based on state
 * - Enable to set animation
 * - Base state for rendering state animation
 * - Basic information can be transferred to another state
 * - ### Render entity by entity own image ID for change type
 * @implements {TransferableState}
 * @classdesc Under player state to render entity by entity own image ID
 */
class UnderPlayerState extends TransferableState { // eslint-disable-line  no-unused-vars
    /**
     * Render entity by this state
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        if (this.stateAnimation !== null) {
            // render
            this.stateAnimation.render(ctx, this.entity.x + shiftX, this.entity.y + shiftY, this.entity.width * this.entity.directionX, this.entity.height, this.entity.imageID);
        }
    }
}
