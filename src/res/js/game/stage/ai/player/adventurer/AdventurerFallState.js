/**
 * State of adventurer fall
 * @implements {NormalFallState}
 * @classdesc State of adventurer fall
 */
class AdventurerFallState extends NormalFallState { // eslint-disable-line  no-unused-vars
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        // input
        let vx = 0;
        if (Input.it.isPressed(Input.key.left())) {
            vx += -1;
        }
        if (Input.it.isPressed(Input.key.right())) {
            vx += 1;
        }
        if (vx != 0) {
            for (let it of this.entity.collider.collisions) {
                if (Math.abs(it.nx) > 0.5 && vx * it.nx > 0) {
                    this.ai.changeState(`downwall`);
                    this.entity.body.enforce(this.movePowerX * this.entity.material.mass * vx / dt, 0);
                    return true;
                }
            }
        }
        if (Input.it.isPress(Input.key.sub())) {
            this.ai.changeState(`special`);
            return true;
        }
        return super.apply(dt);
    }
}
