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
         * @protected
         * @type {number}
         */
        this.startX = startX;
        /**
         * Y coordinate of upper left corner of rectangle
         * @protected
         * @type {number}
         */
        this.startY = startY;
        /**
         * X coordinate of lower right corner of the rectangle
         * @protected
         * @type {number}
         */
        this.endX = startX + width;
        /**
         * Y coordinate of lower right corner of the rectangle
         * @protected
         * @type {number}
         */
        this.endY = startY + height;

        // calclulate initial value
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
     * @interface
     * @param {number} x x position
     * @param {number} y y position
     * @return {boolean} whether position is in collider
     */
    isInCollider(x, y) {
        return this.aabb.startX < x && x < this.aabb.endX && this.aabb.startY < y && y < this.aabb.endY;
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
            if (collider.aabb.startX < this.aabb.endX &&
                this.aabb.startX < collider.aabb.endX &&
                collider.aabb.startY < this.aabb.endY &&
                this.aabb.startY < collider.aabb.endY) {
                let sx = this.aabb.endX - collider.aabb.startX;
                let ex = this.aabb.startX - collider.aabb.endX;
                let sy = this.aabb.endY - collider.aabb.startY;
                let ey = this.aabb.startY - collider.aabb.endY;
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
                    if (this.entity.body === undefined || (this.entity.body.velocityX * nx + this.entity.body.velocityY * ny < 0)) {
                        return false;
                    }
                    data.e1 = this.entity;
                    data.e2 = collider.entity;
                    data.nx = nx;
                    data.ny = ny;
                    data.depth = nlen;
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
        this.aabb.startX = this.entity.x + this.startX;
        this.aabb.startY = this.entity.y + this.startY;
        this.aabb.endX = this.entity.x + this.endX;
        this.aabb.endY = this.entity.y + this.endY;
    }

    /**
     * Render collider for debug
     * @interface
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX, shiftY) {
        ctx.strokeRect(this.aabb.startX + shiftX, this.aabb.startY + shiftY, this.endX - this.startX, this.endY - this.startY);
        // ctx.fillText(this.collisions.length + ``, this.aabb.startX + shiftX, this.aabb.startY + shiftY, 0.0, 0.0, 40, `red`);
    }
}
