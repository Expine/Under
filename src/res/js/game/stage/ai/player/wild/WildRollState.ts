import { UnderMovableState } from "../UnderMovableState";
import { Util } from "../../../../../under/extend/util/Util";
import { Context } from "../../../../../under/base/resources/image/Context";
import { TransferableState } from "../../state/TransferableState";

/**
 * Wild roll state
 * - ### Prepares rolling action
 * @extends {UnderMovableState}
 * @classdesc Wild roll state to prepare rolling action
 */
export class WildRollState extends UnderMovableState {
    /**
     * Wild roll state constructor
     * @constructor
     * @param {number} movePowerX The power of x direction to move in the air
     * @param {number} movePowerY The power of y direction to move in the air
     */
    constructor(movePowerX: number, movePowerY: number) {
        super(0, 0, movePowerX, movePowerY);
    }

    /**
     * Initialize state
     * @override
     */
    init() {
        super.init();
        if (this.entity !== null && this.entity.body !== null) {
            this.entity.body.setNextAddVelocity(-this.entity.body.velocityX, 0);
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
        if (this.entity === null) {
            return true;
        }
        const image = this.entity.getImage();
        if (this.entity.body !== null && this.entity.material !== null && this.ai !== null && image !== null && Util.canEnd(image)) {
            // big jump
            this.entity.body.enforce(this.movePowerX * this.entity.material.mass * this.entity.directionX / dt, -this.movePowerY * this.entity.material.mass / dt);
            this.ai.changeState('rolling');
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
