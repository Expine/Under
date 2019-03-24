import { MaxAdoptBody } from "./MaxAdoptBody";

/**
 * Precise body
 * - Confirm collision every time you move
 * @extends {MaxAdoptBody}
 * @classdesc Precise Body to confirm collision every time you move
 */
export class PreciseBody extends MaxAdoptBody {
    /**
     * Update entity by velocity
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateEntity(dt: number) {
        if (this.entity === null || this.entity.stage === null || this.entity.collider === null) {
            return;
        }
        // move
        let dx = this.velocityX * dt / 1000;
        let dy = this.velocityY * dt / 1000;
        const max = Math.floor(Math.max(Math.abs(dx), Math.abs(dy)));
        const physic = this.entity.stage.getPhysicalWorld();
        // move slightly
        if (max === 0 || physic === null) {
            this.entity.deltaMove(dx, dy);
            return;
        }
        for (let i = 0; i < max; ++i) {
            this.entity.deltaMove(dx / max, dy / max);
            for (const it of physic.getCollisionData(this.entity.collider)) {
                if (it.colliding.collider !== null && it.collided.collider !== null && it.colliding.collider.isResponse(it.collided.collider) && it.collided.collider.isResponse(it.colliding.collider)) {
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
