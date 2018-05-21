/**
 * Elevator AI
 * - Determines the behavior of an entity
 * @extends {AI}
 * @classdesc Elevator AI to go straight ahead and reverses direction if it hit something
 */
class ElevatorAI extends AI { // eslint-disable-line  no-unused-vars
    /**
     * Elevator AI Constructor
     * @constructor
     * @param {number} maxVelocity Maximum speed velocity
     * @param {number} movePower Force applied when moving
     */
    constructor(maxVelocity, movePower) {
        super();

        /**
         * Maximum speed velocity
         * @protected
         * @type {number}
         */
        this.maxVelocity = maxVelocity;
        /**
         * Force applied when moving
         * @protected
         * @type {number}
         */
        this.movePower = movePower;

        /**
         * Elevator floor
         * @protected
         * @type {number}
         */
        this.floor = -1;
        /**
         * Elevator x position list
         * @protected
         * @type {Array<number>}
         */
        this.elevatorXList = [];
        /**
         * Elevator y position list
         * @protected
         * @type {Array<number>}
         */
        this.elevatorYList = [];

        /**
         * Whether player is on it or not
         * @protected
         * @type {boolean}
         */
        this.onPlayer = false;
        /**
         * Whether it moves or not
         * @protected
         * @type {boolean}
         */
        this.isMoving = false;
        /**
         * Counter for not on player
         * @protected
         * @type {number}
         */
        this.notOnPlayercount = 0;
    }

    /**
     * Add elevator position
     * @param {number} x Elevator x position
     * @param {number} y Elevator y position
     */
    addPosition(x, y) {
        this.elevatorXList.push(x);
        this.elevatorYList.push(y);
    }

    /**
     * Initialize AI
     * @override
     */
    init() {
        // apply relative position
        let x = this.entity.x;
        let y = this.entity.y;
        for (let i = 0; i < this.elevatorXList.length; ++i) {
            x += this.elevatorXList[i];
            y += this.elevatorYList[i];
            this.elevatorXList[i] = x;
            this.elevatorYList[i] = y;
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        let localCheck = false;
        // check on ground
        for (let it of this.entity.collider.collisions) {
            let you = Util.getCollidedEntity(this.entity, it);
            if (BaseUtil.implementsOf(you, IPlayable)) {
                if (!this.isMoving && !this.onPlayer) {
                    // move next floor
                    this.floor = (this.floor + 1) % this.elevatorXList.length;
                    this.isMoving = true;
                    this.notOnPlayercount = 0;
                }
                localCheck = true;
                break;
            }
        }
        if (!localCheck) {
            this.notOnPlayercount += dt / 1000;
        }
        if (localCheck || (this.onPlayer && this.notOnPlayercount > 0.5)) {
            this.onPlayer = localCheck;
        }
        if (this.isMoving) {
            let dx = this.elevatorXList[this.floor] - this.entity.x;
            let dy = this.elevatorYList[this.floor] - this.entity.y;
            let d = Math.sqrt(dx * dx + dy * dy);
            if (dx * this.entity.directionX < 0) {
                dx = 0;
                this.entity.directionX = 0;
                this.entity.body.setNextAddVelocity(-this.entity.body.velocityX, 0);
            }
            if (dy * this.entity.directionY < 0) {
                dy = 0;
                this.entity.directionY = 0;
                this.entity.body.setNextAddVelocity(0, -this.entity.body.velocityY);
            }
            if (dx === 0 && dy === 0) {
                this.isMoving = false;
                return true;
            }
            this.entity.directionX = Math.sign(dx);
            this.entity.directionY = Math.sign(dy);
            let fx = Math.abs(this.entity.body.velocityX) < this.maxVelocity ? dx / d * this.movePower * this.entity.material.mass : 0;
            let fy = Math.abs(this.entity.body.velocityY) < this.maxVelocity ? dy / d * this.movePower * this.entity.material.mass : 0;
            this.entity.body.enforce(fx, fy);
        }
        return true;
    }
}
