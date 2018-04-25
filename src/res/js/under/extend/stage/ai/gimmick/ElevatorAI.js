/**
 * Elevator AI
 * - Determines the behavior of an entity
 * @implements {AI}
 * @classdesc Elevator AI to go straight ahead and reverses direction if it hit something
 */
class ElevatorAI extends AI { // eslint-disable-line  no-unused-vars
    /**
     * Elevator AI Constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Maximum speed vector
         * @protected
         * @type {number}
         */
        this.maxVelocityY = 300;
        /**
         * Force applied when moving
         * @protected
         * @type {number}
         */
        this.movePower = 100;
    }

    /**
     * Initialize AI
     * @override
     */
    init() {
        this.entity.directionY = -1;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {
        // check on ground
        for (let it of this.entity.collider.collisions) {
            let you = Util.getCollidedEntity(this.entity, it);
            if (you instanceof ImmutableEntity) {
                if (it.ny * this.entity.directionY > 0) {
                    this.entity.directionY *= -1;
                    break;
                }
            }
        }
        if (Math.abs(this.entity.body.velocityX) < this.maxVelocityY) {
            this.entity.body.enforce(0, this.entity.directionY * this.movePower * this.entity.material.mass);
        }
        return true;
    }
}
