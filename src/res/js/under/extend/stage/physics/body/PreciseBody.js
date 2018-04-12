/**
 * Precise body
 * - Update entity by physical quantity
 * - Adopt the maximum for adding to the next speed
 * - ### Confirm collision every time you move
 * @extends {MaxAdoptBody}
 * @classdesc Precise Body to confirm collision every time you move
 */
class PreciseBody extends MaxAdoptBody { // eslint-disable-line  no-unused-vars
    /**
     * Update entity by velocity
     * @override
     * @protected
     */
    updateEntity(dt) {
        // move
        let dx = this.velocityX * dt / 1000;
        let dy = this.velocityY * dt / 1000;
        let max = Math.floor(Math.max(Math.abs(dx), Math.abs(dy)));
        for (let i = 0; i < max; ++i) {
            this.entity.deltaMove(dx / max, dy / max);
            for (let it of this.entity.stage.getPhysicalWorld().getCollisionData(this.entity)) {
                if (it.nx * dx > 0) {
                    dx = 0;
                }
                if (it.ny * dy > 0) {
                    dy = 0;
                }
            }
            if (dx == 0 && dy == 0) {
                break;
            }
        }
    }
}
