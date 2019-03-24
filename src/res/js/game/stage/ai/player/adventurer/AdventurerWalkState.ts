import { NormalWalkState } from "../normal/NormalWalkState";
import { Input } from "../../../../../under/base/input/Input";
import { isIHook } from "../../../entity/interface/IHook";
import { Util } from "../../../../../under/extend/util/Util";

/**
 * Adventurer walk state
 * - It can drag hook
 * @implements {NormalWalkState}
 * @classdesc Adventurer walk state that can drag hok
 */
export class AdventurerWalkState extends NormalWalkState {
    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt: number): boolean {
        // drag hook
        if (this.entity !== null && this.entity.collider !== null) {
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
        }
        return super.apply(dt);
    }
}
