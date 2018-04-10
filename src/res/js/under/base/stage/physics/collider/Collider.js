/**
 * Collider for judging collision
 * @classdesc collder for collisiion
 */
class Collider { // eslint-disable-line  no-unused-vars
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
        this.isResponse = true;

        /**
         * Whether collision judgment is to be done or not
         * @type {bool}
         */
        this.enable = true;
    }

    /**
     * Initialize state
     */
    init() {
        this.collisions.length = 0;
        this.update();
    }

    /**
     * Set entity attaching this
     * @param {Entity} entity Entity attaching this
     */
    setEntity(entity) {
        /**
         * Entity attaching this
         * @protected
         * @type {Entity}
         */
        this.entity = entity;
    }

    /**
     * Add collision information
     * @param {CollisionData} collision Collision information to be added
     */
    addCollision(collision) {
        this.collisions.push(collision);
    }

    /**
     * Get collider AABB
     * @return {AABB} Axis Aligned Bounding Box
     */
    getAABB() {
        return this.aabb;
    }

    /**
     * Judge whether position is in collider
     * @interface
     * @param {number} x x position
     * @param {number} y y position
     * @return {bool} whether position is in collider
     */
    isInCollider(x, y) {}

    /**
     * Judge whether collision
     * @interface
     * @param {Colllder} collider
     * @param {CollisionData} data Pointer to save conflict information
     * @return {bool} whether collision
     */
    isCollision(collider, data) {}

    /**
     * Judge whether collision roughly
     * @interface
     * @param {Colllder} collider
     * @return {bool} whether collision roughly
     */
    isCollisionRoughly(collider) {
        let me = this.getAABB();
        let you = collider.getAABB();
        return me.endX >= you.startX && you.endX >= me.startX && me.endY >= you.startY & you.endY >= me.startY;
    }

    /**
     * Fix collider bounds
     * @param {AABB} aabb AABB covering collider
     */
    fixBoundDirectly(startX, startY, endX, endY) {
        this.fixBound(new AABB(startX, startY, endX, endY));
    }

    /**
     * Fix collider bounds
     * @interface
     * @param {AABB} aabb AABB covering collider
     */
    fixBound(aabb) {}

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
