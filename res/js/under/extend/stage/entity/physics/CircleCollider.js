/**
 * Circle collider
 * @classdesc Collider for circle
 */
class CircleCollider extends Collider {
    /**
     * Circle collider constructor
     * @constructor
     * @param {Entity} entity Entity attaching this
     * @param {number} radius Circle radius
     * @param {number} [shiftX = 0] Horizontal distance to shift from center
     * @param {number} [shiftY = 0] Vertical distance to shift from center
     */
    constructor(entity, radius, shiftX = 0, shiftY = 0) {
        super();
        /**
         * Entity attaching this
         * @type {Entity}
         */
        this.entity = entity;
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

        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;
    }

    /**
     * Get collider upper left x position
     * @interface
     * @return {number} upper left x position
     */
    getAABBStartX() {
        return this.startX;
    }

    /**
     * Get collider bottom right x position
     * @interface
     * @return {number} bottom right x position
     */
    getAABBEndX() {
        return this.startY;
    }

    /**
     * Get collider upper left y position
     * @interface
     * @return {number} upper left y position
     */
    getAABBStartY() {}

    /**
     * Get collider bottom right y position
     * @interface
     * @return {number} bottom right y position
     */
    getAABBEndY() {}

    /**
     * Get collider center x position
     * @interface
     * @return {number} center x position
     */
    getCenterX() {
        return this.entity.x + this.entity.width / 2 + this.shiftX;
    }

    /**
     * Get collider center y position
     * @interface
     * @return {number} center y position
     */
    getCenterY() {
        return this.entity.y + this.entity.height / 2 + this.shiftY;
    }

    /**
     * Get collider roughly radius
     * @interface
     * @return {number} roughly radius
     */
    getColliderRadius() {
        return this.radius;
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
     * Judge whether collision roughly
     * @interface
     * @param {Colllder} collider
     * @return {boolean} whether collision roughly
     */
    isCollisionRoughly(collider) {
        /*
        let cx = this.getCenterX();
        let cy = this.getCenterY();
        let sx = cx - this.radius;
        let sy = cy - this.radius;
        let ex = cx + this.radius;
        let ey = cy + this.radius;
        return (cx - this.radius)
        */
        let sx = this.getCenterX() - collider.getCenterX();
        let sy = this.getCenterY() - collider.getCenterY();
        let r = this.radius + collider.getColliderRadius();
        return sx * sx + sy * sy <= r * r;

    }

    /**
     * Judge whether collision
     * @interface
     * @param {Colllder} collider
     * @return {boolean} whether collision
     */
    isCollision(collider) {
        if (collider instanceof CircleCollider) {
            let sx = this.getCenterX() - collider.getCenterX();
            let sy = this.getCenterY() - collider.getCenterY();
            let r = this.radius + collider.getColliderRadius();
            return sx * sx + sy * sy <= r * r;
        }
    }
    /**
     * Perform collision response
     * @param {Collider} collider Opponent's collider
     * @param {number} shiftX Horizontal displacement
     * @param {number} shiftY Vertical displacement
     */
    collisionResponse(collider, shiftX, shiftY) {
        while (this.isCollision(collider)) {
            if (collider instanceof CircleCollider) {
                let x = collider.getCenterX() - this.getCenterX();
                let y = collider.getCenterY() - this.getCenterY();
                this.entity.x -= x / 1000;
                this.entity.y -= y / 1000;
            }
        }
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