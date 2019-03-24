import { State } from "../../../../../under/base/stage/ai/state/State";
import { IHook, isIHook } from "../../../entity/interface/IHook";
import { Util } from "../../../../../under/extend/util/Util";
import { Context } from "../../../../../under/base/resources/image/Context";

/**
 * Hook released state
 * - Hook condition after released
 * @extends {State}
 * @classdesc Hook released state after released
 */
export class HookReleasedState extends State {
    /**
     * Hook for getting hook information
     * @protected
     * @type {IHook}
     */
    protected hook: IHook | null;

    /**
     * Hook released state
     * @constructor
     */
    constructor() {
        super();
        this.hook = null;
    }

    /**
     * Initialize
     * @override
     */
    init() {
        if (isIHook(this.entity)) {
            this.hook = this.entity;
        }
    }


    /**
     * Update state
     * @abstract
     * @param {number} dt Delta time
     */
    update(_dt: number) { }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(_dt: number): boolean {
        // check hook
        if (this.hook === null || this.entity === null || this.entity.collider === null) {
            return true;
        }

        // check collisions
        for (const it of this.entity.collider.collisions) {
            const you = Util.getCollidedEntity(this.entity, it);
            if (you === this.hook.getActor()) {
                this.hook.tryRemove();
                break;
            }
        }
        return true;
    }

    /**
     * Render entity by this state
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    render(_ctx: Context, _shiftX: number, _shiftY: number) { }
}
