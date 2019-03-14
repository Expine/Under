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
class AdventurerDownWallState extends UnderMovableState {
    /**
     * Adventurer down wall state constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed
     * @param {number} movePower The power to move in the air
     */
    constructor(maxVelocityX, movePower) {
        super(maxVelocityX, 0, movePower, 0);

        /**
         * Down wall direction
         * @protected
         * @type {number}
         */
        this.directionX = 0;

        /**
         * Down wall counter
         * @protected
         * @type {number}
         */
        this.downWallCount = 0;
    }

    /**
     * Initialize state
     * @override
     */
    init() {
        super.init();
        // Check direction
        this.entity.setDirection(-Math.sign(this.entity.body.velocityX));
        this.directionX = this.entity.directionX;
        this.downWallCount = 0;
        // push wall
        this.entity.body.enforce(-1500 * this.entity.material.mass * this.directionX, 0);
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
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
        if (Input.key.isPress(Input.key.sub())) {
            // check already
            const hooks = this.entity.stage.getEntitiesByInterface(IHook);
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
                        id: BaseUtil.implementsOf(this.entity.collider, IExclude) ? this.entity.collider.getTargetID() : undefined,
                    },
                });
                if (hook instanceof MutableEntity) {
                    hook.body.enforce(900000 * this.entity.directionX / dt, -1500000 / dt);
                }
            }
        }

        // always push wall
        this.entity.body.enforce(-30000 * this.entity.material.mass * this.directionX / dt, 0);
        this.entity.setDirection(this.directionX);
        const collided = this.entity.collider.collisions.some((it) => Math.abs(it.nx) && this.directionX * it.nx < 0);
        if (collided) {
            this.downWallCount = 0;
        } else if (++this.downWallCount > 2) {
            this.entity.body.enforce(90000 * this.entity.material.mass * this.directionX / dt, 0);
            this.ai.changeState(`falling`);
        }
        return true;
    }
}
