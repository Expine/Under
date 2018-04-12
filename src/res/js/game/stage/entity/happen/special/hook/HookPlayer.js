/**
 * Hook player object
 * Player's representation
 * @implements {HookObject}
 * @classdesc Hook player object
 */
class HookPlayer extends HookObject { // eslint-disable-line  no-unused-vars
    /**
     * Hook center x position
     * @override
     * @return {number} Hook center x position
     */
    getHookX() {
        return this.entity.directionX >= 0 ? this.generatedX + this.entity.x + this.entity.width : this.entity.x - this.generatedX;
    }

    /**
     * Hook center x position
     * @override
     * @return {number} Hook center x position
     */
    getHookY() {
        return this.entity.y - this.generatedY;
    }

    /**
     * Enforce tension
     * @param {number} x Tension of x
     * @param {number} y Tension of y
     * @param {number} dt Delta time
     */
    tension(x, y, dt) {
        this.entity.body.enforce(x * 10000 / dt, y * 5000 / dt);
        // this.entity.body.setNextAddVelocity(0, y * 500 / dt - this.entity.body.velocityY);
        // this.entity.body.setNextAddVelocity(x * 1000 / dt - this.entity.body.velocityX, y * 1000 / dt - this.entity.body.velocityY);
    }

    /**
     * Hooked hook
     * @override
     */
    hooked() {}

    /**
     * Release hook
     * @override
     */
    release() {
        super.destroy();
    }

    /**
     * Destroy object
     * @override
     */
    destroy() {}

    /**
     * Update object
     * @override
     * @param {number} dt - delta time
     */
    update(dt) {
        super.update(dt);
    }
}
