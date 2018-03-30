/**
 * Player body
 * Adopt the maximum for adding to the next speed
 * @extends {MaxAdoptBody}
 * @classdesc Body to ddopt the maximum for adding to the next speed
 */
class PlayerBody extends MaxAdoptBody { // eslint-disable-line  no-unused-vars
    /**
     * Update by rigid body
     * @override
     * @param {number} dt delta time
     */
    update(dt) {
        // set previous posiiton
        this.diffX = (this.entity.x - this.preX) * 1000 / dt;
        this.diffY = (this.entity.y - this.preY) * 1000 / dt;
        this.isFix = Math.abs(this.diffX) < 25 && Math.abs(this.diffY) < 50;
        this.preX = this.entity.x;
        this.preY = this.entity.y;

        // next add velocity
        this.velocityX += this.vpx + this.vmx;
        this.velocityY += this.vpy + this.vmy;
        // enforce
        this.velocityX += this.accelerationX * dt / 1000;
        this.velocityY += this.accelerationY * dt / 1000;
        // air resistance
        let kx = -this.velocityX * this.k / this.entity.material.mass * dt / 1000;
        let ky = -this.velocityY * this.k / this.entity.material.mass * dt / 1000;
        if (Math.abs(this.velocityX) < Math.abs(kx)) {
            this.velocityX = 0;
        } else {
            this.velocityX += kx;
        }
        if (Math.abs(this.velocityY) < Math.abs(ky)) {
            this.velocityY = 0;
        } else {
            this.velocityY += ky;
        }
        // move
        let dx = /* Math.abs(this.velocityX) < 25 ? 0 : */ this.velocityX * dt / 1000;
        let dy = /* Math.abs(this.velocityY) < 50 ? 0 : */ this.velocityY * dt / 1000;
        // TODO: To move finely
        /*
        let max = Math.floor(Math.max(Math.abs(dx), Math.abs(dy) * 100));
        let data = new CollisionData();
        for (let i = 0; i < max; ++i) {
            this.entity.deltaMove(dx / max, dy / max);
            for (let it of this.entity.stage.getEntities()) {
                if (it.collider !== undefined && it.collider.isCollisionRoughly(this.entity.collider) && it.collider.isCollision(this.entity.collider, data)) {
                    if (data.nx * dx < 0) {
                        dx = 0;
                    }
                    if (data.ny * dy < 0) {
                        dy = 0;
                    }
                }
                if (dx == 0 && dy == 0) {
                    break;
                }
            }
            if (dx == 0 && dy == 0) {
                break;
            }
        }
        this.entity.collider.collisions.length = 0;
        */
        this.entity.deltaMove(dx, dy);
        // reserve velocity and acceleration
        this.preVelocityX = this.velocityX;
        this.preVelocityY = this.velocityY;
        this.preAccelerationX = this.accelerationX;
        this.preAccelerationY = this.accelerationY;
        // reset
        this.accelerationX = 0;
        this.accelerationY = 0;
        this.vpx = 0;
        this.vpy = 0;
        this.vmx = 0;
        this.vmy = 0;
    }
}
