import { UnderMovableState } from "../UnderMovableState";
import { GameAnimation } from "../../../../../under/base/resources/image/GameAnimation";
import { Util } from "../../../../../under/extend/util/Util";
import { Context } from "../../../../../under/base/resources/image/Context";
import { TransferableState } from "../../state/TransferableState";

/**
 * Propeller jump state
 * - ### It not transitate falling and can fly
 * @extends {UnderMovableState}
 * @classdesc Propeller jump state that can fly
 */
export class PropellerJumpingState extends UnderMovableState {
    /**
     * Amount of indicating difference of height
     * @protected
     * @type {number}
     */
    protected propellerDiffY: number;

    /**
     * Propeller jump state constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed x vector
     * @param {number} maxVelocityY Maximum speed y vector
     * @param {number} movePowerX Force of x direction applied when moving
     * @param {number} movePowerY Force of y direction applied when moving
     */
    constructor(maxVelocityX: number, maxVelocityY: number, movePowerX: number, movePowerY: number) {
        super(maxVelocityX, maxVelocityY, movePowerX, movePowerY);
        this.propellerDiffY = 8;
    }

    /**
     * Move y direction by input
     * @override
     * @protected
     * @param {number} vy y direction
     * @param {number} dt Delta time
     */
    moveY(vy: number, dt: number) {
        if (this.entity === null || this.entity.body === null || this.entity.material === null) {
            return;
        }
        if (this.entity.body.velocityY * vy < 0 || Math.abs(this.entity.body.velocityY) < Math.abs(this.maxVelocityY)) {
            const power = vy === 1 ? this.movePowerY / 10 : this.movePowerY;
            this.entity.body.enforce(0, power * this.entity.material.mass * vy / dt);
        }
    }

    /**
     * Initialize state
     * @override
     */
    init() {
        super.init();
        if (this.entity === null || this.entity.collider === null) {
            return;
        }
        const image = this.entity.getImage();
        if (image instanceof GameAnimation) {
            image.restore();
        }
        const aabb = this.entity.collider.getAABB();
        if (aabb !== null) {
            this.entity.collider.fixBound(aabb.startX - this.entity.x, aabb.startY - this.propellerDiffY - this.entity.y, aabb.endX - this.entity.x, aabb.endY - this.entity.y);
        }
    }

    /**
     * Update state
     * @override
     * @param {number} dt Delta time
     */
    update(dt: number) {
        if (this.entity === null) {
            return;
        }
        const image = this.entity.getImage();
        if (image !== null) {
            image.update(dt * 3);
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt: number): boolean {
        this.moveByInput(dt);
        if (this.entity !== null && Util.onGround(this.entity)) {
            this.transitionUsualState();
            // restore
            if (this.entity.collider !== null) {
                const aabb = this.entity.collider.getAABB();
                if (aabb !== null) {
                    this.entity.collider.fixBound(aabb.startX - this.entity.x, aabb.startY + this.propellerDiffY - this.entity.y, aabb.endX - this.entity.x, aabb.endY - this.entity.y);
                }
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
