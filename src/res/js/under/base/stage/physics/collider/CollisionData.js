/**
 * Collision data
 * - ### Data obtained by collision detection
 * @interface
 * @classdesc Collision data obtained by collision detection
 */
class CollisionData { // eslint-disable-line  no-unused-vars
    /**
     * Collision data constructor
     * @constructor
     * @param {MutableEntity} colliding Colliding entity
     * @param {InfluentialEntity} collided Collided entity
     * @param {number} nx X component of normal vector
     * @param {number} ny Y component of normal vector
     * @param {number} px Collision x point
     * @param {number} py Collision y point
     * @param {number} depth Depth of collision
     */
    constructor(colliding, collided, nx, ny, px, py, depth) {
        /**
         * Colliding entity
         * @type {MutableEntity}
         */
        this.colliding = colliding;
        /**
         * Collided entity
         * @type {InfluentialEntity}
         */
        this.collided = collided;
        /**
         * X component of normalized collision vector from colliding to collided
         * @type {number}
         */
        this.nx = nx;
        /**
         * Y component of normalized collision vector from colliding to collided
         * @type {number}
         */
        this.ny = ny;
        /**
         * Depth of collision
         * @type {number}
         */
        this.depth = depth;
        /**
         * Collision x point
         * @type {number}
         */
        this.px = px;
        /**
         * Collision y point
         * @type {number}
         */
        this.py = py;

        /**
         * Descending priority
         * @protected
         * @type {number}
         */
        this.priorityVal = 0;
    }

    get priority() {
        if (this.priorityVal === null) {
            this.priorityVal = this.calcPriority();
        }
        return this.priorityVal;
    }

    /**
     * Register information
     * @param {MutableEntity} colliding Colliding entity
     * @param {InfluentialEntity} collided Collided entity
     * @param {number} nx X component of normal vector
     * @param {number} ny Y component of normal vector
     * @param {number} px Collision x point
     * @param {number} py Collision y point
     * @param {number} depth Depth of collision
     */
    register(colliding, collided, nx, ny, px, py, depth) {
        this.colliding = colliding;
        this.collided = collided;
        this.nx = nx;
        this.ny = ny;
        this.px = px;
        this.py = py;
        this.depth = depth;
    }

    /**
     * Initialize collision data
     */
    init() {
        this.priorityVal = null;
    }

    /**
     * Calculate descending priority
     * @abstract
     * @protected
     * @return {number} Priority
     */
    calcPriority() {}
}
