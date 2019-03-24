import { NormalJumpingState } from "../normal/NormalJumpingState";
import { Input } from "../../../../../under/base/input/Input";
import { Util } from "../../../../../under/extend/util/Util";
import { isIHook } from "../../../entity/interface/IHook";

/**
 * Adventurer jump state
 * - It can drag hook
 * @extends {NormalJumpingState}
 * @classdesc Adventurer jump state that can drag hook
 */
export class AdventurerJumpingState extends NormalJumpingState {
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt: number): boolean {
        if (this.entity === null || this.entity.collider === null) {
            return super.apply(dt);
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
