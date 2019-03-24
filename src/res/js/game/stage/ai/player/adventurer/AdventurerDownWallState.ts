import { UnderMovableState } from "../UnderMovableState";
import { Input } from "../../../../../under/base/input/Input";
import { Util } from "../../../../../under/extend/util/Util";
import { isIHook } from "../../../entity/interface/IHook";
import { isIExclude } from "../../../physics/collider/IExclude";
import { MutableEntity } from "../../../../../under/base/stage/entity/MutableEntity";
import { Context } from "../../../../../under/base/resources/image/Context";
import { TransferableState } from "../../state/TransferableState";

/**
 * State of adventurer down wall
 * - Determines the operation by AI according to the state and renders based on state
 * - Initialize state image
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - Enable to set velocity and power
 * @extends {UnderMovableState}
 * @classdesc State of adventurer down wall
 */
export class AdventurerDownWallState extends UnderMovableState {
    /**
     * Down wall direction
     * @protected
     * @type {number}
     */
    protected directionX: number;

    /**
     * Down wall counter
     * @protected
     * @type {number}
     */
    protected downWallCount: number;

    /**
     * Adventurer down wall state constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed
     * @param {number} movePower The power to move in the air
     */
    constructor(maxVelocityX: number, movePower: number) {
        super(maxVelocityX, 0, movePower, 0);

        this.directionX = 0;
        this.downWallCount = 0;
    }

    /**
     * Initialize state
     * @override
     */
    init() {
        super.init();
        // Check direction
        if (this.entity === null || this.entity.body === null || this.entity.material === null) {
            return;
        }
        this.entity.setDirection(-Math.sign(this.entity.body.velocityX));
        this.directionX = this.entity.directionX;
        this.downWallCount = 0;
        // push wall
        this.entity.body.enforce(-1500 * this.entity.material.mass * this.directionX, 0);
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
        if (this.entity === null || this.entity.body === null || this.entity.material === null || this.ai === null) {
            return true;
        }
        // input
        let vx = 0;
        if (Input.key.isPressed(Input.key.left()) && this.directionX === -1) {
            vx += -1;
        }
        if (Input.key.isPressed(Input.key.right()) && this.directionX === 1) {
            vx += 1;
        }
        if (vx !== 0) {
            this.entity.body.enforce(this.movePowerX * this.entity.material.mass * vx / dt, 0);
            this.ai.changeState(`falling`);
            return true;
        }
        if (Util.onGround(this.entity)) {
            this.transitionUsualState();
            return true;
        }
        if (Input.key.isPress(Input.key.sub()) && this.entity.stage !== null) {
            // check already
            const hooks = this.entity.stage.getEntitiesByInterface(isIHook);
            if (hooks.length >= 1) {
                for (const it of hooks) {
                    if (it.getActor() === this.entity) {
                        it.release();
                    }
                }
            } else {
                const hook = this.entity.stage.addEntityByID(200010, {
                    x: this.entity.x + this.entity.width / 2,
                    y: this.entity.y + this.entity.height / 2,
                    z: this.entity.z - 1,
                    owner: this.entity,
                    collider: {
                        id: isIExclude(this.entity.collider) ? this.entity.collider.getTargetID() : undefined,
                    },
                });
                if (hook instanceof MutableEntity && hook.body !== null) {
                    hook.body.enforce(900000 * this.entity.directionX / dt, -1500000 / dt);
                }
            }
        }

        // always push wall
        this.entity.body.enforce(-30000 * this.entity.material.mass * this.directionX / dt, 0);
        this.entity.setDirection(this.directionX);
        if (this.entity.collider === null) {
            return true;
        }
        const collided = this.entity.collider.collisions.some((it) => this.directionX * it.nx < 0);
        if (collided) {
            this.downWallCount = 0;
        } else if (++this.downWallCount > 2) {
            this.entity.body.enforce(90000 * this.entity.material.mass * this.directionX / dt, 0);
            this.ai.changeState(`falling`);
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
