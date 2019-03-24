import { UnderMovableState } from "../UnderMovableState";
import { Util } from "../../../../../under/extend/util/Util";
import { TransferableState } from "../../state/TransferableState";
import { Context } from "../../../../../under/base/resources/image/Context";

/**
 * Normal fall state
 * - To falling, walk and stop
 * @extends {UnderMovableState}
 * @classdesc Normal fall state to falling, walk and stop
 */
export class NormalFallState extends UnderMovableState {
    /**
     * Normal fall state constructor
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
        if (this.entity === null) {
            return true;
        }
        // move
        this.moveByInput(dt);
        const image = this.entity.getImage();
        if (image !== null && this.ai !== null && Util.canEnd(image)) {
            this.ai.changeState(`falling`);
        }
        if (Util.onGround(this.entity)) {
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
