/**
 * State of adventurer down wall
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
        super();

        this.maxVelocityX = maxVelocityX;
        this.movePowerX = movePower;

        /**
         * Down wall direction
         * @protected
         * @type {number}
         */
        this.directionX = 0;
    }

    /**
     * Initialize state
     * @override
     */
    init() {
        super.init();
        // Check input
        this.entity.directionX = -Math.sign(this.entity.body.velocityX);
        this.directionX = this.entity.directionX;
        this.downWallCount = 0;
        // push wall
        this.entity.body.enforce(-1500 * this.entity.material.mass * this.directionX, 0);
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
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
            let hooks = this.entity.stage.getEntities().filter((it) => BaseUtil.implementsOf(it, Hookable));
            if (hooks.length >= 1) {
                for (let it of hooks) {
                    if (it.getActor() === this.entity) {
                        it.release();
                    }
                }
            } else {
                let x = this.entity.x + (this.entity.directionX == 1 ? this.entity.width - 22 : -32 + 22);
                let hook = new HookHead(x, this.entity.y + 8, 32, 32, this.entity, 6, 1000);
                hook.body.enforce(6000000 * this.entity.directionX / dt, -10000000 / dt);
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
        } else {
            this.ai.changeState(`falling`);
        }
        return true;
    }
}
