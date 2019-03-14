/**
 * Precise body
 * - Update entity by physical quantity
 * - Adopt the maximum for adding to the next speed
 * - ### Confirm collision every time you move
 * @extends {MaxAdoptBody}
 * @classdesc Precise Body to confirm collision every time you move
 */
class PreciseBody extends MaxAdoptBody {
    /**
     * Update entity by velocity
     * @override
     * @protected
     */
    updateEntity(dt) {
        // move
        let dx = this.velocityX * dt / 1000;
        let dy = this.velocityY * dt / 1000;
        const max = Math.floor(Math.max(Math.abs(dx), Math.abs(dy)));
        // move slightly
        if (max === 0) {
            this.entity.deltaMove(dx, dy);
            return;
        }
        for (let i = 0; i < max; ++i) {
            this.entity.deltaMove(dx / max, dy / max);
            for (const it of this.entity.stage.getPhysicalWorld().getCollisionData(this.entity.collider)) {
                if (it.colliding.collider.isResponse(it.collided.collider) && it.collided.collider.isResponse(it.colliding.collider)) {
                    if (it.nx * dx > 0) {
                        dx = 0;
                    }
                    if (it.ny * dy > 0) {
                        dy = 0;
                    }
                }
            }
            if (dx === 0 && dy === 0) {
                break;
            }
        }
    }
}
