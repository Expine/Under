import { UnderMovableState } from "../UnderMovableState";
import { IUnderPlayable, isIUnderPlayable } from "../../../entity/interface/IUnderPlayable";
import { GameAnimation } from "../../../../../under/base/resources/image/GameAnimation";
import { NamedAnimation } from "../../../../../under/base/resources/image/NamedAnimation";
import { Input } from "../../../../../under/base/input/Input";
import { Util } from "../../../../../under/extend/util/Util";
import { isITerrain } from "../../../entity/interface/ITerrain";
import { Context } from "../../../../../under/base/resources/image/Context";
import { TransferableState } from "../../state/TransferableState";

/**
 * Normal grab state
 * - Manages grabed behavior
 * @extends {UnderMovableState}
 * @classdesc Normal grab state to manage grabed behavior
 */
export class NormalGrabState extends UnderMovableState {
    /**
     * Count for action
     * @protected
     * @type {number}
     */
    protected underCount: number;

    /**
     * Amount of indicating difference of height
     * @protected
     * @type {number}
     */
    protected underDiffY: number;

    /**
     * Player at registered entity
     * @protected
     * @type {IUnderPlayable}
     */
    protected player: IUnderPlayable | null;

    /**
     * Normal grab state constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed
     * @param {number} walkPower The power to walk
     */
    constructor(maxVelocityX: number, walkPower: number) {
        super(maxVelocityX, 0, walkPower, 0);

        this.underCount = 0;
        this.underDiffY = 12;
        this.player = null;
    }

    /**
     * Type changed function
     * @protected
     */
    changed() {
        this.restoreCollider();
    }

    /**
     * Change collider for grab action
     * @protected
     */
    grabCollider() {
        if (this.entity !== null && this.entity.collider !== null) {
            const aabb = this.entity.collider.getAABB();
            if (aabb !== null) {
                this.entity.collider.fixBound(aabb.startX - this.entity.x, aabb.startY + this.underDiffY - this.entity.y, aabb.endX - this.entity.x, aabb.endY - this.entity.y);
            }
        }
    }

    /**
     * Restore collider information
     * @protected
     */
    restoreCollider() {
        if (this.entity !== null && this.entity.collider !== null) {
            const aabb = this.entity.collider.getAABB();
            if (aabb !== null) {
                this.entity.collider.fixBound(aabb.startX - this.entity.x, aabb.startY - this.underDiffY - this.entity.y, aabb.endX - this.entity.x, aabb.endY - this.entity.y);
            }
        }
    }

    /**
     * Judged whether or not the state continues
     * @protected
     * @return {boolean} Whether or not the state continues
     */
    judgeContinue(): boolean {
        if (++this.underCount <= 5) {
            return true;
        }

        if (this.entity === null || this.entity.stage === null || this.entity.collider === null) {
            return true;
        }
        const physic = this.entity.stage.getPhysicalWorld();
        if (physic === null) {
            return true;
        }

        // check collision
        this.restoreCollider();
        const check = physic.getCollisionData(this.entity.collider).some((it) => it.collided.collider !== null && this.entity !== null && this.entity.collider !== null && it.collided.collider.isResponse(this.entity.collider) && it.ny < -0.5);
        if (check) {
            this.grabCollider();
            return true;
        }

        // restore
        const image = this.entity.getImage();
        if (image !== null) {
            image.init();
        }
        this.transitionUsualState();
        return false;
    }

    /**
     * Walk whle grab state
     * @protected
     * @param {number} dt Delta time
     */
    grabWalk(dt: number) {
        const moved = this.moveByInput(dt);
        if (moved && this.entity !== null) {
            const image = this.entity.getImage();
            if (image instanceof GameAnimation) {
                image.restore();
            }
            if (this.ai !== null && image !== null && this.ai.getStateID() === `grab`) {
                image.init();
            }
            if (this.ai !== null && this.ai.changeState(`grabwalk`)) {
                // restore
                this.restoreCollider();
            }
        } else if (this.entity !== null) {
            const image = this.entity.getImage();
            if (image instanceof GameAnimation) {
                image.pause();
            }
        }
    }

    /**
     * Initialize state
     * @override
     */
    init() {
        // set image
        if (this.entity !== null) {
            const image = this.entity.getImage();
            if (image instanceof NamedAnimation && this.ai !== null) {
                image.setName(this.ai.getStateID());
            }
            if (image instanceof GameAnimation) {
                image.restore();
            }
        }
        this.underCount = 0;
        this.grabCollider();

        if (isIUnderPlayable(this.entity)) {
            this.player = this.entity;
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
        const canGrabAction = (!(image instanceof GameAnimation) || (image.isEnded() || image.isLoop()));
        // judge
        if (!Util.onGround(this.entity) || !Input.key.isPressed(Input.key.down())) {
            if (!this.judgeContinue()) {
                return true;
            }
        } else {
            this.underCount = 0;
        }
        // move
        if (canGrabAction && Util.onGround(this.entity)) {
            this.grabWalk(dt);
        }
        // grab action
        if (canGrabAction && Util.onGround(this.entity)) {
            // change
            const ground = Util.getUnderEntity(this.entity);
            if (isITerrain(ground) && this.player !== null) {
                if (this.player.changeType(ground.getTerrainID())) {
                    this.changed();
                    return true;
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
