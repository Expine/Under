/**
 * Collder
 * - ### Store collider data for judgeing collision
 * @interface
 * @classdesc Collider to store collider data for judging collision
 */
class Collider {
    /**
     * Collider constructor
     * @constructor
     */
    constructor() {
        /**
         * AABB for collision detection
         * @protected
         * @type {AABB}
         */
        this.aabb = null;

        /**
         * List of collided objects
         * @type {Array<CollisionData>}
         */
        this.collisions = [];

        /**
         * Whether to perform collision response or not
         * @type {boolean}
         */
        this.response = true;
        /**
         * Whether collision judgment is to be done or not
         * @type {boolean}
         */
        this.enable = true;

        /**
         * Entity attaching this
         * @protected
         * @type {Entity}
         */
        this.entity = null;

        /**
         * Whether or not the collision information has already been cleared
         * @protected
         * @type {boolean}
         */
        this.cleared = false;
    }

    /**
     * Initialize state
     */
    init() {
        if (!this.cleared) {
            this.clear();
        }
        this.update();
        this.cleared = false;
    }

    /**
     * Clear collision data
     */
    clear() {
        this.collisions.length = 0;
        this.cleared = true;
    }

    /**
     * Set entity attaching this
     * @param {Entity} entity Entity attaching this
     */
    setEntity(entity) {
        this.entity = entity;
    }

    /**
     * Set collider AABB
     * @param {AABB} aabb Axis Aligned Bounding Box
     */
    setAABB(aabb) {
        this.aabb = aabb;
    }

    /**
     * Get collider AABB
     * @return {AABB} Axis Aligned Bounding Box
     */
    getAABB() {
        return this.aabb;
    }

    /**
     * Add collision information
     * @param {CollisionData} collision Collision information to be added
     */
    addCollision(collision) {
        this.collisions.push(collision);
    }

    /**
     * Set whether to perform collision response or not
     * @param {Colllder} collider Target collider
     * @return {boolean} whether to perform collision response or not
     */
    isResponse(collider) {
        return this.response;
    }

    /**
     * Judge whether position is in collider
     * @abstract
     * @param {number} x X position
     * @param {number} y Y position
     * @return {boolean} Whether position is in collider
     */
    isInCollider(x, y) {}

    /**
     * Judge whether collision
     * @abstract
     * @param {Colllder} collider Target collider
     * @param {CollisionData} [data=null] Pointer to save conflict information
     * @return {boolean} Whether collision
     */
    isCollision(collider, data = null) {}

    /**
     * Judge whether collision roughly
     * @param {Colllder} collider Target collider
     * @return {boolean} Qhether collision roughly
     */
    isCollisionRoughly(collider) {
        // check enable
        if (!this.enable) {
            return false;
        }
        const me = this.getAABB();
        const you = collider.getAABB();
        return me.endX >= you.startX && you.endX >= me.startX && me.endY >= you.startY && you.endY >= me.startY;
    }

    /**
     * Fix collider bounds
     * @abstract
     * @param {number} startX Relative x coordinate of the upper left
     * @param {number} startY Relative y coordinate of the upper left
     * @param {number} endX Relative x coordinate of the lower right
     * @param {number} endY Relative y coordinate of the lower right
     */
    fixBound(startX, startY, endX, endY) {}

    /**
     * Update collide information
     * Called whenever coordinate information is updated
     * @abstract
     */
    update() {}

    /**
     * Render collider for debug
     * @abstract
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {}
}
