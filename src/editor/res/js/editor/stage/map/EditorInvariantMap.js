/**
 * Map where the background does not move
 * And referense point is lower left
 * @extends {InvariantBackMap}
 * @classdesc Map where the background does not move
 */
class EditorInvariantBackMap extends InvariantBackMap { // eslint-disable-line  no-unused-vars
    /**
     * Render map
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        ctx.drawImage(this.backID_, 0, Screen.it.height - 850);
    }
}
