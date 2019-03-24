import { UnderPlayerState } from "../UnderPlayerState";
import { Entity } from "../../../../../under/base/stage/entity/Entity";
import { Util } from "../../../../../under/extend/util/Util";
import { GameAnimation } from "../../../../../under/base/resources/image/GameAnimation";
import { Context } from "../../../../../under/base/resources/image/Context";
import { TransferableState } from "../../state/TransferableState";

/**
 * Normal punch state
 * - About to attack
 * @extends {UnderPlayerState}
 * @classdesc Normal punch state that about to attack
 */
export class NormalPunchState extends UnderPlayerState {
    /**
     * Whether it attacked or not
     * @protected
     * @type {boolean}
     */
    protected attacked: boolean;

    /**
     * Animation threshold for starting attack
     * @protected
     * @type {number}
     */
    protected threshold: number;

    /**
     * Normal punch state
     * @constructor
     */
    constructor() {
        super();

        this.attacked = false;
        this.threshold = 0.5;
    }

    /**
     * Make attack object
     * @protected
     * @return {Entity} Attack object
     */
    makeAttackObject(): Entity | null {
        return this.entity === null || this.entity.stage === null ? null : this.entity.stage.addEntityByID(200000, {
            x: this.entity.x + (this.entity.directionX === 1 ? this.entity.width - 22 : -32 + 22),
            y: this.entity.y + 27,
            z: this.entity.z + 1,
            owner: this.entity,
        });
    }

    init() {
        super.init();
        this.attacked = false;
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
        if (this.entity === null) {
            return true;
        }
        const image = this.entity.getImage();
        if (image !== null && !Util.canEnd(image) && (image as GameAnimation).getAnimationCount() < this.threshold) {
            return true;
        }
        if (!this.attacked) {
            this.makeAttackObject();
            this.attacked = true;
        }
        // change state
        if (image !== null && Util.canEnd(image)) {
            // punch
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
