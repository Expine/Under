/**
 * Collision data
 * - ### Data obtained by collision detection
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
        // TODO: Is a collision point necessary?
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
         * @type {number}
         */
        this.priority = 0;
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
     * @abstract
     */
    init() {}

    /**
     * Calculate descending priority
     * @abstract
     * @return {number} Priority
     */
    calcPriority() {}
}
