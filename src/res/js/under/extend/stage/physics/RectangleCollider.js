/**
 * Rectangle collider
 * @classdesc Collider for rectangle
 */
class RectangleCollder extends Collider { // eslint-disable-line  no-unused-vars
    /**
     * Rectangle collider constructor
     * @constructor
     * @param {Entity} entity Entity attaching this
     * @param {number} startX X coordinate of upper left corner of rectangle
     * @param {number} startY Y coordinate of upper left corner of rectangle
     * @param {number} width Width of rectangle
     * @param {number} height Height of rectangle
     */
    constructor(entity, startX, startY, width, height) {
        super(entity);

        /**
         * X coordinate of upper left corner of rectangle
         * @type {number}
         */
        this.startX = startX;
        /**
         * Y coordinate of upper left corner of rectangle
         * @type {number}
         */
        this.startY = startY;

        /**
         * X coordinate of the lower right corner of the rectangle
         * @type {number}
         */
        this.endX = startX + width;
        /**
         * Y coordinate of the lower right corner of the rectangle
         * @type {number}
         */
        this.endY = startY + height;
    }

    /**
     * Get collider AABB
     * @override
     * @return {AABB} Axis Aligned Bounding Box
     */
    getAABB() {
        this.aabb.startX = this.entity.x + this.startX;
        this.aabb.startY = this.entity.y + this.startY;
        this.aabb.endX = this.entity.x + this.endX;
        this.aabb.endY = this.entity.y + this.endY;
        return this.aabb;
    }

    /**
     * Judge whether position is in collider
     * @interface
     * @param {number} x x position
     * @param {number} y y position
     * @return {boolean} whether position is in collider
     */
    isInCollider(x, y) {
        let sx = this.entity.x + this.startX;
        let sy = this.entity.y + this.startY;
        let ex = this.entity.x + this.endX;
        let ey = this.entity.y + this.endY;
        return sx < x && x < ex && sy < y && y < ey;
    }

    /**
     * Judge whether collision
     * @interface
     * @param {Colllder} collider
     * @param {CollisionData} data Pointer to save conflict information
     * @return {boolean} whether collision
     */
    isCollision(collider, data) {
        if (collider instanceof RectangleCollder) {
            let sx = collider.entity.x + collider.startX - this.entity.x + this.startX;
            let sy = collider.entity.y + collider.startY - this.entity.y + this.startY;
            let ex = collider.entity.x + collider.endX - this.entity.x + this.endX;
            let ey = collider.entity.y + collider.endY - this.entity.y + this.endY;

            //            let px = sx;
            //            let py = sy;

            if (collider.entity.x + collider.startX < this.entity.x + this.endX &&
                this.entity.x + this.startX < collider.entity.x + collider.endX &&
                collider.entity.y + collider.startY < this.entity.y + this.endY &&
                this.entity.y + this.startY < collider.entity.y + collider.endY) {
                sx = (this.entity.x + this.endX) - (collider.entity.x + collider.startX);
                ex = (this.entity.x + this.startX) - (collider.entity.x + collider.endX);
                sy = (this.entity.y + this.endY) - (collider.entity.y + collider.startY);
                ey = (this.entity.y + this.startY) - (collider.entity.y + collider.endY);
                if (data !== undefined) {
                    let nx = Math.abs(sx) < Math.abs(ex) ? sx : ex;
                    let ny = Math.abs(sy) < Math.abs(ey) ? sy : ey;
                    let nlen = 0;
                    if (Math.abs(nx) < Math.abs(ny)) {
                        nlen = Math.abs(nx);
                        nx = Math.sign(nx);
                        ny = 0;
                    } else {
                        nlen = Math.abs(ny);
                        nx = 0;
                        ny = Math.sign(ny);
                    }
                    data.e1 = this.entity;
                    data.e2 = collider.entity;
                    data.nx = nx;
                    data.ny = ny;
                    data.depth = nlen;
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
        ctx.strokeRect(this.entity.x + this.startX + shiftX, this.entity.y + this.startY + shiftY, this.endX - this.startX, this.endY - this.startY);
    }
}
