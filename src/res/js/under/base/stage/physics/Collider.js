/**
 * Collider for judging collision
 * @classdesc collder for collisiion
 */
class Collider { // eslint-disable-line  no-unused-vars
    /**
     * Collider constructor
     * @constructor
     * @param {Entity} entity Entity attaching this
     * @param {bool} isResponse Whether to perform collision response or not
     */
    constructor(entity, isResponse) {
        /**
         * Entity attaching this
         * @type {Entity}
         */
        this.entity = entity;

        /**
         * AABB for collision detection
         * @protected
         * @type {AABB}
         */
        this.aabb = new AABB();

        /**
         * List of collided objects
         * @type {Array<CollisionData>}
         */
        this.collisions = [];

        /**
         * Whether to perform collision response or not
         * @type {bool}
         */
        this.isResponse = isResponse;
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
     * Judge whether position is in collider
     * @interface
     * @param {number} x x position
     * @param {number} y y position
     * @return {boolean} whether position is in collider
     */
    isInCollider(x, y) {}

    /**
     * Judge whether collision
     * @interface
     * @param {Colllder} collider
     * @param {number} dt delta time
     * @param {CollisionData} data Pointer to save conflict information
     * @return {boolean} whether collision

     */
    isCollision(collider, dt, data) {}

    /**
     * Judge whether collision roughly
     * @interface
     * @param {Colllder} collider
     * @return {boolean} whether collision roughly
     */
    isCollisionRoughly(collider) {
        let me = this.getAABB();
        let you = collider.getAABB();
        return me.endX >= you.startX && you.endX >= me.startX && me.endY >= you.startY & you.endY >= me.startY;
    }

    /**
     * Initialize state
     */
    init() {
        this.collisions.length = 0;
        this.update();
    }

    /**
     * Update collide information
     * Called whenever coordinate information is updated
     * @interface
     */
    update() {}

    /**
     * Render collider for debug
     * @interface
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {}
}
