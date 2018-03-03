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
     * @return {boolean} whether collision
     */
    isCollision(collider) {
        if (collider instanceof CircleCollider) {
            let sx = this.getCenterX() - collider.getCenterX();
            let sy = this.getCenterY() - collider.getCenterY();
            let r = this.radius + collider.radius;
            return sx * sx + sy * sy <= r * r;
        }
    }
    /**
     * Perform collision response
     * @param {Collider} collider Opponent's collider
     * @param {number} shiftX Horizontal displacement
     * @param {number} shiftY Vertical displacement
     */
    collisionResponse(collider, shiftX, shiftY, dt) {
        if (this.isCollision(collider)) {
            if (collider instanceof CircleCollider) {
                let nx = collider.getCenterX() - this.getCenterX();
                let ny = collider.getCenterY() - this.getCenterY();
                let nlen = Math.sqrt(nx * nx + ny * ny);
                nx = nx / nlen;
                ny = ny / nlen;
                let b1 = this.entity.body;
                let b2 = collider.entity.body;
                if (b2 !== undefined) {
                    let dot1 = b1 === undefined ? 0 : (b1.shiftX_ * nx + b1.shiftY_ * ny);
                    let dot2 = b2 === undefined ? 0 : (b2.shiftX_ * nx + b2.shiftY_ * ny);
                    let v1x = dot1 * nx;
                    let v1y = dot1 * ny;
                    let v2x = dot2 * nx;
                    let v2y = dot2 * ny;
                    let vdx = v2x - v1x;
                    let vdy = v2y - v1y;
                    let m1 = b1 === undefined ? (b2 === undefined ? 1 : b2.mass) : b1.mass;
                    let m2 = b2 === undefined ? (b1 === undefined ? 1 : b1.mass) : b2.mass;
                    let e = b1 === undefined ? (b2 === undefined ? 0 : b1.e) : (b2 === undefined ? b1.e : Math.max(b1.e, b2.e));
                    let j = (1 + e) * m1 * m2 / (m1 + m2) / dt;
                    let d = (collider.radius + this.radius - nlen) * 10;
                    if (b1 !== undefined) {
                        let dd = d * ((b2 !== undefined) ? 1 : 0.1);
                        b1.enforce(j * vdx - dd * nx, j * vdy - dd * ny);
                    }
                    if (b2 !== undefined) {
                        //                    b2.enforce(-j * vdx, -j * vdy);
                    }
                } else {
                    let dot1 = b1 === undefined ? 0 : (b1.shiftX_ * nx + b1.shiftY_ * ny);
                    let v1x = dot1 * nx;
                    let v1y = dot1 * ny;
                    let m1 = b1 === undefined ? (b2 === undefined ? 1 : b2.mass) : b1.mass;
                    let e = b1 === undefined ? (b2 === undefined ? 0 : b1.e) : (b2 === undefined ? b1.e : Math.max(b1.e, b2.e));
                    let j = (1 + e) * m1 / -dt;
                    let d = (collider.radius + this.radius - nlen) * 10;
                    b1.enforce(j * v1x - d * nx, j * v1y - d * ny);
                }
            }
        }
        /*
        while (this.isCollision(collider)) {
            if (collider instanceof CircleCollider) {
                let x = collider.getCenterX() - this.getCenterX();
                let y = collider.getCenterY() - this.getCenterY();
                this.entity.x -= x / 1000;
                this.entity.y -= y / 1000;
            }
        }
        */
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
