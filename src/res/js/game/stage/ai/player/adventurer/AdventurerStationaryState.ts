import { NormalStationaryState } from "../normal/NormalStationaryState";
import { Input } from "../../../../../under/base/input/Input";
import { Util } from "../../../../../under/extend/util/Util";
import { isIHook } from "../../../entity/interface/IHook";

/**
 * Adventurer stationary state
 * - It can drag hook
 * @extends {NormalStationaryState}
 * @classdesc Adventurer stationary state that can drag hook
 */
export class AdventurerStationaryState extends NormalStationaryState {
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
