import { UnderPlayerState } from "../UnderPlayerState";
import { IDamagable, isIDamagable } from "../../../../../under/base/stage/entity/interface/IDamagable";
import { TransferableState } from "../../state/TransferableState";
import { Context } from "../../../../../under/base/resources/image/Context";

/**
 * Common judge state
 * - Does nothing but transfer gameover only if entity is died
 * @extends {UnderPlayerState}
 * @classdesc Common judge state to do nothing but transfer gameover only if entity is died
 */
export class CpmmonJudgeState extends UnderPlayerState {
    /**
     * Damaged target at registered entity
     * @protected
     * @type {IDamagable}
     */
    protected damagedTarget: IDamagable | null;

    /**
     * Common judge state constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Damaged target at registered entity
         * @protected
         * @type {IDamagable}
         */
        this.damagedTarget = null;
    }

    /**
     * Initialize
     * @override
     */
    init() {
        super.init();
        if (isIDamagable(this.entity)) {
            this.damagedTarget = this.entity;
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
    apply(_dt: number): boolean {
        if (this.ai !== null && this.damagedTarget !== null && this.damagedTarget.getHP() <= 0) {
            this.ai.changeState('gameover');
            return true;
        }
        return false;
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
