/**
 * Adventurer fall state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - Enable to set velocity and power
 * - To falling, walk and stop
 * - ### It can release and drag hook and down wall
 * @extends {NormalFallState}
 * @classdesc Adventurer fall state that can release hook and down wall
 */
class AdventurerFallState extends NormalFallState { // eslint-disable-line  no-unused-vars
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // down wall check
        let vx = 0;
        if (Input.key.isPressed(Input.key.left())) {
            vx += -1;
        }
        if (Input.key.isPressed(Input.key.right())) {
            vx += 1;
        }
        // down wall
        if (vx != 0) {
            for (let it of this.entity.collider.collisions) {
                if (Math.abs(it.nx) > 0.5 && vx * it.nx > 0 && it.colliding.collider.isResponse(it.collided.collider) && it.collided.collider.isResponse(it.colliding.collider)) {
                    this.ai.changeState(`downwall`);
                    this.entity.body.enforce(this.movePowerX * this.entity.material.mass * vx / dt, 0);
                    return true;
                }
            }
        }
        // drag hook
        if (Input.key.isPressed(Input.key.up())) {
            for (let it of this.entity.collider.collisions) {
                let you = Util.getCollidedEntity(this.entity, it);
                if (BaseUtil.implementsOf(you, IHook) && !you.isHead() && you.getActor() === this.entity) {
                    if (you.tryRemove()) {
                        return true;
                    }
                }
            }
        }
        // release hook
        if (Input.key.isPress(Input.key.sub())) {
            let hooks = this.entity.stage.getEntities().filter((it) => BaseUtil.implementsOf(it, IHook));
            if (hooks.length >= 1) {
                for (let it of hooks) {
                    if (it.getActor() === this.entity) {
                        it.release();
                    }
                }
            }
        }
        return super.apply(dt);
    }
}
