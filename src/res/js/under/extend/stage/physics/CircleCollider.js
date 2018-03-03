/**
 * Circle collider
 * @classdesc Collider for circle
 */
class CircleCollider extends Collider { // eslint-disable-line  no-unused-vars
    /**
     * Circle collider constructor
     * @constructor
     * @param {Entity} entity Entity attaching this
     * @param {number} radius Circle radius
     * @param {number} [shiftX = 0] Horizontal distance to shift from center
     * @param {number} [shiftY = 0] Vertical distance to shift from center
     */
    constructor(entity, radius, shiftX = 0, shiftY = 0) {
        super(entity);
        /**
         * Circle radius
         * @type {number}
         */
        this.radius = radius;

        /**
         * Horizontal distance to shift from center
         * @type {number}
         */
        this.shiftX = shiftX;
        /**
         * Vertical distance to shift from center
         * @type {number}
         */
        this.shiftY = shiftY;
    }

    /**
     * Get collider AABB
     * @override
     * @return {AABB} Axis Aligned Bounding Box
     */
    getAABB() {
        this.aabb.startX = this.entity.x + this.shiftX;
        this.aabb.startY = this.entity.y + this.shiftY;
        this.aabb.endX = this.entity.x + this.radius * 2 + this.shiftX;
        this.aabb.endY = this.entity.y + this.radius * 2 + this.shiftY;
        return this.aabb;
    }

    /**
     * Get center x position of cicle
     * @return {number} Center x position
     */
    getCenterX() {
        return this.entity.x + this.radius + this.shiftX;
    }

    /**
     * Get center x position of cicle
     * @return {number} Center x position
     */
    getCenterY() {
        return this.entity.y + this.radius + this.shiftY;
    }

    /**
     * Judge whether position is in collider
     * @interface
     * @param {number} x x position
     * @param {number} y y position
     * @return {boolean} whether position is in collider
     */
    isInCollider(x, y) {
        let sx = this.getCenterX() - x;
        let sy = this.getCenterY() - y;
        return sx * sx + sy * sy <= this.radius * this.radius;
    }

    /**
     * Judge whether collision
     * @interface
     * @param {Colllder} collider
     * @param {CollisionData} data Pointer to save conflict information
     * @return {boolean} whether collision
     */
    isCollision(collider, data) {
        if (collider instanceof CircleCollider) {
            let nx = collider.getCenterX() - this.getCenterX();
            let ny = collider.getCenterY() - this.getCenterY();
            let r = this.radius + collider.radius;
            if (nx * nx + ny * ny < r * r) {
                if (data !== undefined) {
                    let nlen = Math.sqrt(nx * nx + ny * ny);
                    data.e1 = this.entity;
                    data.e2 = collider.entity;
                    data.nx = nx / nlen;
                    data.ny = ny / nlen;
                    data.depth = collider.radius + this.radius - nlen;
                }
                return true;
            }
        }
        return false;
    }

    /**
     * Render collider for debug
     * @interface
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX, shiftY) {
        ctx.strokeCircle(this.getCenterX() + shiftX, this.getCenterY() + shiftY, this.radius, 0, 2 * Math.PI, false);
    }
}
