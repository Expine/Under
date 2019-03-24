import { NormalFallState } from "../normal/NormalFallState";
import { Input } from "../../../../../under/base/input/Input";
import { Util } from "../../../../../under/extend/util/Util";
import { isIHook } from "../../../entity/interface/IHook";

/**
 * Adventurer fall state
 * - ### It can release and drag hook and down wall
 * @extends {NormalFallState}
 * @classdesc Adventurer fall state that can release hook and down wall
 */
export class AdventurerFallState extends NormalFallState {
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt: number): boolean {
        if (this.entity === null || this.entity.collider === null || this.entity.body === null || this.entity.material === null || this.ai === null) {
            return super.apply(dt);
        }
        // down wall check
        let vx = 0;
        if (Input.key.isPressed(Input.key.left())) {
            vx += -1;
        }
        if (Input.key.isPressed(Input.key.right())) {
            vx += 1;
        }
        // down wall
        if (vx !== 0) {
            for (const it of this.entity.collider.collisions) {
                if (Math.abs(it.nx) > 0.5 && vx * it.nx > 0 && it.colliding.collider !== null && it.collided.collider !== null && it.colliding.collider.isResponse(it.collided.collider) && it.collided.collider.isResponse(it.colliding.collider)) {
                    this.ai.changeState(`downwall`);
                    this.entity.body.enforce(this.movePowerX * this.entity.material.mass * vx / dt, 0);
                    return true;
                }
            }
        }
        // drag hook
        if (Input.key.isPressed(Input.key.up())) {
            for (const it of this.entity.collider.collisions) {
                const you = Util.getCollidedEntity(this.entity, it);
                if (isIHook(you) && !you.isHead() && you.getActor() === this.entity) {
                    if (you.tryRemove()) {
                        return true;
                    }
                }
            }
        }
        // release hook
        if (Input.key.isPress(Input.key.sub()) && this.entity.stage !== null) {
            const hooks = this.entity.stage.getEntitiesByInterface(isIHook);
            for (const it of hooks) {
                if (it.getActor() === this.entity) {
                    it.release();
                }
            }
        }
        return super.apply(dt);
    }
}
