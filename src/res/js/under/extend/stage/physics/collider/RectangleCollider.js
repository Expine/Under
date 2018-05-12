/**
 * Rectangle collider
 * - Store collider data for judgeing collision
 * - ### Makes a collision judgment considered to be rectangle
 * @extends {Collider}
 * @classdesc Rectangle collider to make a collision judgment considered to be rectangle
 */
class RectangleCollider extends Collider { // eslint-disable-line  no-unused-vars
    /**
     * Rectangle collider constructor
     * @constructor
     * @param {number} startX X coordinate of upper left corner of rectangle
     * @param {number} startY Y coordinate of upper left corner of rectangle
     * @param {number} width Width of rectangle
     * @param {number} height Height of rectangle
     */
    constructor(startX, startY, width, height) {
        super();

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
    }

    /**
     * Judge whether position is in collider
     * @override
     * @param {number} x X position
     * @param {number} y Y position
     * @return {boolean} whether position is in collider
     */
    isInCollider(x, y) {
        return this.aabb.startX < x && x < this.aabb.endX && this.aabb.startY < y && y < this.aabb.endY;
    }

    /**
     * Judge whether collision
     * @override
     * @param {Colllder} collider Target collider
     * @param {CollisionData} data Pointer to save conflict information
     * @return {boolean} whether collision
     */
    isCollision(collider, data) {
        if (collider instanceof RoundRectangleCollider) {
            return collider.isCollision(this, data);
        } else if (collider instanceof RectangleCollider) {
            let sx = this.aabb.endX - collider.aabb.startX;
            let ex = this.aabb.startX - collider.aabb.endX;
            let sy = this.aabb.endY - collider.aabb.startY;
            let ey = this.aabb.startY - collider.aabb.endY;
            if (0 < sx && ex < 0 && 0 < sy && ey < 0) {
                if (data !== undefined) {
                    let me = this.entity;
                    let you = collider.entity;
                    let nx = Math.abs(sx) < Math.abs(ex) ? sx : ex;
                    let ny = Math.abs(sy) < Math.abs(ey) ? sy : ey;
                    let depth = 0;
                    if (me instanceof MutableEntity && me.body.velocityX * nx + me.body.velocityY * ny > 0) {} else if (you instanceof MutableEntity && you.body.velocityX * nx + you.body.velocityY * ny < 0) {
                        let swap = me;
                        me = you;
                        you = swap;
                        nx = -nx;
                        ny = -ny;
                    } else if (!me instanceof MutableEntity || !you instanceof InfluentialEntity) {
                        console.log(`Error: Colliding entity should be mutable and collided entity should be influential`);
                    }
                    if (me.body.velocityX * nx <= 0) {
                        nx = Math.abs(ny) + 1;
                    }
                    if (me.body.velocityY * ny <= 0) {
                        ny = Math.abs(nx) + 1;
                    }
                    if (Math.abs(nx) < Math.abs(ny)) {
                        depth = Math.abs(nx);
                        nx = Math.sign(nx);
                        ny = 0;
                    } else {
                        depth = Math.abs(ny);
                        nx = 0;
                        ny = Math.sign(ny);
                    }
                    let px = me.x + nx * depth;
                    let py = me.y + ny * depth;
                    data.register(me, you, nx, ny, px, py, depth);
                }
                return true;
            }
        } else if (collider instanceof CircleCollider) {
            // TODO: Should implement
        }
        return false;
    }

    /**
     * Fix collider bounds
     * @override
     * @param {number} startX Relative x coordinate of the upper left
     * @param {number} startY Relative y coordinate of the upper left
     * @param {number} endX Relative x coordinate of the lower right
     * @param {number} endY Relative y coordinate of the lower right
     */
    fixBound(startX, startY, endX, endY) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.update();
    }

    /**
     * Update collide information
     * Called whenever coordinate information is updated
     * @override
     */
    update() {
        // AABB
        this.aabb.update(this.startX, this.startY, this.endX, this.endY, this.entity);
    }

    /**
     * Render collider for debug
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX, shiftY) {
        // rect
        ctx.strokeRect(this.aabb.startX + shiftX, this.aabb.startY + shiftY, this.endX - this.startX, this.endY - this.startY);
        // collision
        let me = 0;
        let you = 0;
        for (let it of this.collisions) {
            if (it.colliding === this.entity) {
                me += 1;
            } else {
                you += 1;
            }
        }
        if (me != 0 || you != 0) {
            ctx.fillText(me + ``, this.aabb.startX + shiftX + 15, this.aabb.startY + shiftY, 0.0, 0.0, 15, `blue`);
            ctx.fillText(you + ``, this.aabb.startX + shiftX, this.aabb.startY + shiftY + 15, 0.0, 0.0, 15, `red`);
        }
        // vector
        for (let it of this.collisions) {
            if (it.collided === this.entity) {
                continue;
            }
            ctx.strokeLine(
                this.aabb.startX + shiftX + (this.endX - this.startX) / 2,
                this.aabb.startY + shiftY + (this.endY - this.startY) / 2,
                this.aabb.startX + shiftX + (this.endX - this.startX) / 2 + it.nx * 30 * (it.colliding === this.entity ? 1 : -1),
                this.aabb.startY + shiftY + (this.endY - this.startY) / 2 + it.ny * 30 * (it.colliding === this.entity ? 1 : -1),
                `red`);
        }
    }
}
