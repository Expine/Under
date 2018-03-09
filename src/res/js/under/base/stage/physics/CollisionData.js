/**
 * Collision pair data
 * Data obtained by collision detection
 * @classdesc Collision pair data obtained by collision detection
 */
class CollisionData { // eslint-disable-line  no-unused-vars
    /**
     * Collision data constructor
     * @constructor
     * @param {Entity} e1 Collision entity
     * @param {Entity} e2 Collision entity
     * @param {number} nx X component of normal vector
     * @param {number} ny Y component of normal vector
     * @param {number} depth Depth of collision
     */
    constructor(e1, e2, nx, ny, depth) {
        /**
         * Collision entity
         * @type {Entity}
         */
        this.e1 = e1;
        /**
         * Collision entity
         * @type {Entity}
         */
        this.e2 = e2;
        /**
         * X component of normal vector
         * @type {number}
         */
        this.nx = nx;
        /**
         * Y component of normal vector
         * @type {number}
         */
        this.ny = ny;
        /**
         * Depth of collision
         * @type {number}
         */
        this.depth = depth;
    }
}
