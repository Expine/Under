import { UnderPlayerState } from "../UnderPlayerState";
import { isIHook } from "../../../entity/interface/IHook";
import { Util } from "../../../../../under/extend/util/Util";
import { isIExclude } from "../../../physics/collider/IExclude";
import { MutableEntity } from "../../../../../under/base/stage/entity/MutableEntity";
import { Context } from "../../../../../under/base/resources/image/Context";
import { TransferableState } from "../../state/TransferableState";

/**
 * Adventurer hook state
 * - It can generate and release hook
 * @extends {UnderPlayerState}
 * @classdesc Adventurer hook state that can generate and release hook
 */
export class AdventurerHookState extends UnderPlayerState {
    /**
     * Initilaize state
     * @override
     */
    init() {
        super.init();
        if (this.entity === null || this.entity.stage === null) {
            return;
        }
        // check release
        const hooks = this.entity.stage.getEntitiesByInterface(isIHook);
        if (hooks.length >= 1) {
            for (const it of hooks) {
                if (it.getActor() === this.entity) {
                    it.release();
                }
            }
            this.transitionUsualState();
        }
    }

    /**
     * Update state
     * @override
     * @param {number} dt Delta time
     */
    update(_dt: number) { }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt: number): boolean {
        if (this.entity === null || this.entity.stage === null) {
            return true;
        }
        // generate hook
        const image = this.entity.getImage();
        if (image !== null && Util.canEnd(image)) {
            const hook = this.entity.stage.addEntityByID(200010, {
                x: this.entity.x + this.entity.width / 2,
                y: this.entity.y + this.entity.height / 2,
                z: this.entity.z - 1,
                owner: this.entity,
                collider: {
                    id: isIExclude(this.entity.collider) ? this.entity.collider.getTargetID() : undefined,
                },
            });
            if (hook instanceof MutableEntity && hook.body !== null) {
                hook.body.enforce(1200000 * this.entity.directionX / dt, -2000000 / dt);
            }
            this.transitionUsualState();
        }
        return true;
    }

    /**
     * Render entity by this state
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    render(_ctx: Context, _shiftX: number, _shiftY: number) { }

    /**
     * Transfer information to another state
     * @override
     * @param {TransferableState} state Where to give information
     */
    transfer(_state: TransferableState) { }
}
