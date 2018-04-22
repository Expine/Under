/**
 * State of adventurer down wall
 * - Determines the operation by AI according to the state and renders based on state
 * - Enable to set animation
 * - Base state for rendering state animation
 * - Basic information can be transferred to another state
 * - Render entity by entity own image ID for change type
 * - Sets max velocity and move power for moving
 * - Enable to set velocity and power
 * @implements {UnderMovableState}
 * @classdesc State of adventurer down wall
 */
class AdventurerDownWallState extends UnderMovableState { // eslint-disable-line  no-unused-vars
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
        this.entity.directionX = -Math.sign(this.entity.body.velocityX);
        this.directionX = this.entity.directionX;
        this.downWallCount = 0;
        // push wall
        this.entity.body.enforce(-1500 * this.entity.material.mass * this.directionX, 0);
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        // input
        let vx = 0;
        if (Input.it.isPressed(Input.key.left()) && this.directionX == -1) {
            vx += -1;
        }
        if (Input.it.isPressed(Input.key.right()) && this.directionX == 1) {
            vx += 1;
        }
        if (vx != 0) {
            this.entity.body.enforce(this.movePowerX * this.entity.material.mass * vx / dt, 0);
            this.ai.changeState(`falling`);
            return true;
        }
        if (Util.onGround(this.entity)) {
            if (this.entity.body.isFixX) {
                this.ai.changeState(`stationary`);
            } else {
                this.ai.changeState(`walk`);
            }
            return true;
        }
        if (Input.it.isPress(Input.key.sub())) {
            // check already
            let hooks = this.entity.stage.getEntities().filter((it) => BaseUtil.implementsOf(it, IHook));
            if (hooks.length >= 1) {
                for (let it of hooks) {
                    if (it.getActor() === this.entity) {
                        it.release();
                    }
                }
            } else {
                let hook = new HookHead(this.entity.x + this.entity.width / 2, this.entity.y + this.entity.height / 2, 32, 32, this.entity, 4, 300, 200);
                hook.body.enforce(900000 * this.entity.directionX / dt, -1500000 / dt);
                this.entity.stage.addEntity(hook);
            }
        }

        // always push wall
        let collided = false;
        for (let it of this.entity.collider.collisions) {
            if (Math.abs(it.nx) > 0.5 && this.directionX * it.nx < 0) {
                collided = true;
            }
        }
        if (collided) {
            this.entity.body.enforce(-30000 * this.entity.material.mass * this.directionX / dt, 0);
            this.entity.directionX = this.directionX;
            this.downWallCount = 0;
        } else if (++this.downWallCount > 2) {
            this.ai.changeState(`falling`);
        } else {
            this.entity.body.enforce(-30000 * this.entity.material.mass * this.directionX / dt, 0);
            this.entity.directionX = this.directionX;
        }
        return true;
    }
}
