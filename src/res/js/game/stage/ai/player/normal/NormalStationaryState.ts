import { UnderMovableState } from "../UnderMovableState";
import { Util } from "../../../../../under/extend/util/Util";
import { Input } from "../../../../../under/base/input/Input";
import { Context } from "../../../../../under/base/resources/image/Context";
import { TransferableState } from "../../state/TransferableState";

/**
 * Normal stationary state
 * - To walk, jump, grab, attack, special and fall
 * @extends {UnderMovableState}
 * @classdesc Normal stationary state to walk, jump, grab, attack, special and fall
 */
export class NormalStationaryState extends UnderMovableState {
    /**
     * Falling count
     * @protected
     * @type {number}
     */
    protected fallCount: number;

    /**
     * Normal stationary state constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed
     * @param {number} walkPower The power to walk
     */
    constructor(maxVelocityX: number, walkPower: number) {
        super(maxVelocityX, 0, walkPower, 0);
        this.fallCount = 0;
    }

    /**
     * Initialize state
     * @override
     */
    init() {
        super.init();
        this.fallCount = 0;
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
        if (this.entity === null || this.ai === null) {
            return true;
        }
        // move
        const moved = this.moveByInput(dt);
        if (moved) {
            this.ai.changeState('walk');
        }
        if (Util.onGround(this.entity)) {
            if (Input.key.isPressed(Input.key.down())) {
                this.ai.changeState('grab');
            }
            if (Input.key.isPressed(Input.key.up())) {
                if (moved) {
                    this.ai.changeState('walkjump');
                } else {
                    this.ai.changeState('jump');
                }
            }
            if (Input.key.isPress(Input.key.yes())) {
                this.ai.changeState('attack');
            }
            if (Input.key.isPress(Input.key.sub())) {
                this.ai.changeState('special');
            }
            this.fallCount = 0;
        } else {
            if (++this.fallCount > 2) {
                this.ai.changeState('fall');
            }
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
