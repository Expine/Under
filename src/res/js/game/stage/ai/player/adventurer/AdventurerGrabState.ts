import { NormalGrabState } from "../normal/NormalGrabState";
import { isIHook } from "../../../entity/interface/IHook";

/**
 * Adventurer grab state
 * - If entity changed, all hook is released
 * @extends {NormalGrabState}
 * @classdesc Adventurer grab state that relase all hook if entity changed
 */
export class AdventurerGrabState extends NormalGrabState {
    /**
     * Type changed function
     * @override
     * @protected
     */
    changed() {
        super.changed();

        // auto release
        if (this.entity !== null && this.entity.stage !== null) {
            const hooks = this.entity.stage.getEntitiesByInterface(isIHook);
            for (const it of hooks) {
                if (it.getActor() === this.entity) {
                    it.release();
                }
            }
        }
    }
}
