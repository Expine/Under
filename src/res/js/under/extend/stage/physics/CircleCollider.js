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
         * @protected
         * @type {number}
         */
        this.radius = radius;

        /**
         * Horizontal distance to shift from center
         * @protected
         * @type {number}
         */
        this.shiftX = shiftX;
        /**
         * Vertical distance to shift from center
         * @protected
         * @type {number}
         */
        this.shiftY = shiftY;

        /**
         * Center x position calculated by update
         * @protected
         * @type {number}
         */
        this.centerX = 0;

        /**
         * Center y position calculated by update
         * @protected
         * @type {number}
         */
        this.centerY = 0;

        // calculate initial value
        this.update();
    }

    /**
     * Get collider AABB
     * @override
     * @return {AABB} Axis Aligned Bounding Box
     */
    getAABB() {
        return this.aabb;
    }

    /**
     * Judge whether position is in collider
     * @override
     * @param {number} x x position
     * @param {number} y y position
     * @return {boolean} whether position is in collider
     */
    isInCollider(x, y) {
        let sx = this.centerX - x;
        let sy = this.centerY - y;
        return sx * sx + sy * sy <= this.radius * this.radius;
    }

    /**
     * Judge whether collision
     * @override
     * @param {Colllder} collider
     * @param {CollisionData} data Pointer to save conflict information
     * @return {boolean} whether collision
     */
    isCollision(collider, data) {
        if (collider instanceof CircleCollider) {
            let nx = collider.centerX - this.centerX;
            let ny = collider.centerY - this.centerY;
            let r = this.radius + collider.radius;
            if (nx * nx + ny * ny < r * r) {
                if (data !== undefined) {
                    let nlen = Math.sqrt(nx * nx + ny * ny);
                    data.e1 = this.entity;
                    data.e2 = collider.entity;
                    data.nx = nx / nlen;
                    data.ny = ny / nlen;
                    data.depth = collider.radius + this.radius - nlen;
                    if (!this.collisions.includes(data)) {
                        this.collisions.push(data);
                    }
                }
                return true;
            }
        }
        return false;
    }

    /**
     * Update collide information
     * Called whenever coordinate information is updated
     * @override
     */
    update() {
        // AABB
        this.aabb.startX = this.entity.x + this.shiftX;
        this.aabb.startY = this.entity.y + this.shiftY;
        this.aabb.endX = this.entity.x + this.radius * 2 + this.shiftX;
        this.aabb.endY = this.entity.y + this.radius * 2 + this.shiftY;
        // Center position
        this.centerX = this.entity.x + this.radius + this.shiftX;
        this.centerY = this.entity.y + this.radius + this.shiftY;
    }

    /**
     * Render collider for debug
     * @override
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX, shiftY) {
        ctx.strokeCircle(this.centerX + shiftX, this.centerY + shiftY, this.radius, 0, 2 * Math.PI, false);
        // ctx.fillText(this.collisions.length + ``, this.centerX + shiftX, this.centerY + shiftY, 0.5, 0.5, this.radius * 2, `red`);
    }
}
