import { UnderMovableState } from "../UnderMovableState";
import { Util } from "../../../../../under/extend/util/Util";
import { TransferableState } from "../../state/TransferableState";
import { Context } from "../../../../../under/base/resources/image/Context";

/**
 * Normal jumping state
 * - To fall, walk and stop
 * @extends {UnderMovableState}
 * @classdesc Normal jumping state to fall, walk and stop
 */
export class NormalJumpingState extends UnderMovableState {
    /**
     * Normal jumping state constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed
     * @param {number} movePower The power to move in the air
     */
    constructor(maxVelocityX: number, movePower: number) {
        super(maxVelocityX, 0, movePower, 0);
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
        // move
        this.moveByInput(dt);
        if (this.entity !== null && this.entity.body !== null && this.ai !== null && this.entity.body.velocityY > 0) {
            this.ai.changeState(`fall`);
        }
        if (this.entity !== null && Util.onGround(this.entity)) {
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
