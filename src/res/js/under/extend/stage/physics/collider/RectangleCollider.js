/**
 * Rectangle collider
 * - Store collider data for judgeing collision
 * - ### Makes a collision judgment considered to be rectangle
 * @implements {Collider}
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
     * @interface
     * @param {number} x x position
     * @param {number} y y position
     * @return {bool} whether position is in collider
     */
    isInCollider(x, y) {
        return this.aabb.startX < x && x < this.aabb.endX && this.aabb.startY < y && y < this.aabb.endY;
    }

    /**
     * Judge whether collision
     * @interface
     * @param {Colllder} collider
     * @param {CollisionData} data Pointer to save conflict information
     * @return {bool} whether collision
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
                    let nx = Math.abs(sx) < Math.abs(ex) ? sx : ex;
                    let ny = Math.abs(sy) < Math.abs(ey) ? sy : ey;
                    if (this.entity.body !== undefined && Math.abs(Math.abs(nx) - Math.abs(ny)) < 1) {
                        if (nx * this.entity.body.velocityX <= 0) {
                            nx = this.endX - this.startX + 1;
                        }
                        if (ny * this.entity.body.velocityY <= 0) {
                            ny = this.endY - this.startY + 1;
                        }
                        if (Math.abs(nx) > this.endX - this.startX && Math.abs(ny) > this.endY - this.startY) {
                            return false;
                        }
                    }
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
                    let base = (this.aabb.endX - this.aabb.startX + collider.aabb.endX - collider.aabb.startX);
                    data.px = (this.aabb.startX + this.aabb.endX) / 2 * (this.aabb.endX - this.aabb.startX) / base + (collider.aabb.startX + collider.aabb.endX) / 2 * (collider.aabb.endX - collider.aabb.startX) / base;
                    base = (this.aabb.endY - this.aabb.startY + collider.aabb.endY - collider.aabb.startY);
                    data.py = (this.aabb.startY + this.aabb.endY) / 2 * (this.aabb.endY - this.aabb.startY) / base + (collider.aabb.startY + collider.aabb.endY) / 2 * (collider.aabb.endY - collider.aabb.startY) / base;
                    data.depth = nlen;
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
     * @param {AABB} aabb AABB covering collider
     */
    fixBound(aabb) {
        this.startX = aabb.startX;
        this.startY = aabb.startY;
        this.endX = aabb.endX;
        this.endY = aabb.endY;
        this.update();
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
            if (it.e1 === this.entity) {
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
            if (it.e2 === this.entity) {
                continue;
            }
            var hueVal = it.e1.imageID + (it.e2.imageID << 5);
            ctx.strokeLine(
                this.aabb.startX + shiftX + (this.endX - this.startX) / 2,
                this.aabb.startY + shiftY + (this.endY - this.startY) / 2,
                this.aabb.startX + shiftX + (this.endX - this.startX) / 2 + it.nx * 30 * (it.e1 === this.entity ? 1 : -1),
                this.aabb.startY + shiftY + (this.endY - this.startY) / 2 + it.ny * 30 * (it.e1 === this.entity ? 1 : -1),
                hueVal);
        }
    }
}
