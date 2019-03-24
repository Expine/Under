import { BaseState } from "../state/BaseState";
import { Entity } from "../../../../base/stage/entity/Entity";
import { Util } from "../../../util/Util";
import { GameAnimation } from "../../../../base/resources/image/GameAnimation";
import { Context } from "../../../../base/resources/image/Context";

/**
 * Player punch state
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - ### About to attack
 * @extends {BaseState}
 * @classdesc Player punch state that about to attack
 */
export class PPunchState extends BaseState {
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
     * Player punch state
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
        if (this.entity === null || this.entity.stage === null) {
            return null;
        }
        const punch = this.entity.stage.addEntityByID(200000, {
            x: this.entity.x + (this.entity.directionX === 1 ? this.entity.width - 22 : -32 + 22),
            y: this.entity.y + 27,
            z: this.entity.z + 1,
            owner: this.entity,
        });
        return punch;
    }

    /**
     * Initialize
     * @override
     */
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
        if (this.entity !== null) {
            const image = this.entity.getImage();
            if (image === null || !(image instanceof GameAnimation)) {
                return false;
            }
            if (!Util.canEnd(image) && image.getAnimationCount() < this.threshold) {
                return false;
            }
            if (!this.attacked) {
                this.makeAttackObject();
                this.attacked = true;
            }
            // change state
            if (Util.canEnd(image) && this.ai !== null) {
                // punch
                if (this.entity.body !== null && Math.abs(this.entity.body.velocityX) < 100) {
                    this.ai.changeState(`stationary`);
                } else {
                    this.ai.changeState(`walk`);
                }
            }
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
}
