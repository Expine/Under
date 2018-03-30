/**
 * Rectangle collider taken a horn
 * @implements {Collider}
 * @classdesc Collider for rectangle taken a horn
 */
class RoundRectangleCollider extends RectangleCollider { // eslint-disable-line  no-unused-vars
    /**
     * Rectangle collider constructor
     * @constructor
     * @param {number} startX X coordinate of upper left corner of rectangle
     * @param {number} startY Y coordinate of upper left corner of rectangle
     * @param {number} width Width of rectangle
     * @param {number} height Height of rectangle
     * @param {number} cut Amount of taken horn
     */
    constructor(startX, startY, width, height, cut) {
        super(startX, startY, width, height);
        /**
         * Amount of taken horn
         * @protected
         * @type {number}
         */
        this.cut = cut;
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
            let sx = this.aabb.endX - this.cut - collider.aabb.startX - collider.cut;
            let ex = this.aabb.startX + this.cut - collider.aabb.endX + collider.cut;
            let sy = this.aabb.endY - collider.aabb.startY;
            let ey = this.aabb.endY - collider.aabb.endY;
            let nx = 0;
            let ny = 0;
            let d = Math.max(this.endX - this.startX, this.endY - this.startY) + 1;
            if (0 < sx && ex < 0 && 0 < sy && ey < 0 && sy < d) {
                nx = 0;
                ny = 1;
                d = sy;
            }

            sx = this.aabb.startX - collider.aabb.startX;
            ex = this.aabb.startX - collider.aabb.endX;
            sy = this.aabb.endY - this.cut - collider.aabb.startY - collider.cut;
            ey = this.aabb.startY + this.cut - collider.aabb.endY + collider.cut;
            if (0 < sx && ex < 0 && 0 < sy && ey < 0 && -ex < d) {
                nx = -1;
                ny = 0;
                d = -ex;
            }

            sx = this.aabb.endX - collider.aabb.startX;
            ex = this.aabb.endX - collider.aabb.endX;
            sy = this.aabb.endY - this.cut - collider.aabb.startY - collider.cut;
            ey = this.aabb.startY + this.cut - collider.aabb.endY + collider.cut;
            if (0 < sx && ex < 0 && 0 < sy && ey < 0 && sx < d) {
                nx = 1;
                ny = 0;
                d = sx;
            }

            sx = this.aabb.endX - this.cut - collider.aabb.startX - collider.cut;
            ex = this.aabb.startX + this.cut - collider.aabb.endX + collider.cut;
            sy = this.aabb.startY - collider.aabb.startY;
            ey = this.aabb.startY - collider.aabb.endY;
            if (0 < sx && ex < 0 && 0 < sy && ey < 0 && -ey < d) {
                nx = 0;
                ny = -1;
                d = -ey;
            }
            if (d < Math.max(this.endX - this.startX, this.endY - this.startY)) {
                if (data !== undefined) {
                    data.e1 = this.entity;
                    data.e2 = collider.entity;
                    data.nx = nx;
                    data.ny = ny;
                    let base = (this.aabb.endX - this.aabb.startX + collider.aabb.endX - collider.aabb.startX);
                    data.px = (this.aabb.startX + this.aabb.endX) / 2 * (this.aabb.endX - this.aabb.startX) / base + (collider.aabb.startX + collider.aabb.endX) / 2 * (collider.aabb.endX - collider.aabb.startX) / base;
                    base = (this.aabb.endY - this.aabb.startY + collider.aabb.endY - collider.aabb.startY);
                    data.py = (this.aabb.startY + this.aabb.endY) / 2 * (this.aabb.endY - this.aabb.startY) / base + (collider.aabb.startY + collider.aabb.endY) / 2 * (collider.aabb.endY - collider.aabb.startY) / base;
                    data.depth = d;
                }
                return true;
            }
        } else if (collider instanceof RectangleCollider) {
            let cutX = this.cut;
            let cutY = this.cut;
            let sx = this.aabb.endX - cutX - collider.aabb.startX;
            let ex = this.aabb.startX + cutX - collider.aabb.endX;
            let sy = this.aabb.endY - collider.aabb.startY;
            let ey = this.aabb.endY - collider.aabb.endY;
            let nx = 0;
            let ny = 0;
            let d = Math.max(this.endX - this.startX, this.endY - this.startY) + 1;
            if (0 < sx && ex < 0 && 0 < sy && ey < 0 && sy < d) {
                nx = 0;
                ny = 1;
                d = sy;
            }

            sx = this.aabb.startX - collider.aabb.startX;
            ex = this.aabb.startX - collider.aabb.endX;
            sy = this.aabb.endY - cutY - collider.aabb.startY;
            ey = this.aabb.startY + cutY - collider.aabb.endY;
            if (0 < sx && ex < 0 && 0 < sy && ey < 0 && -ex < d) {
                nx = -1;
                ny = 0;
                d = -ex;
            }

            sx = this.aabb.endX - collider.aabb.startX;
            ex = this.aabb.endX - collider.aabb.endX;
            sy = this.aabb.endY - cutY - collider.aabb.startY;
            ey = this.aabb.startY + cutY - collider.aabb.endY;
            if (0 < sx && ex < 0 && 0 < sy && ey < 0 && sx < d) {
                nx = 1;
                ny = 0;
                d = sx;
            }

            sx = this.aabb.endX - cutX - collider.aabb.startX;
            ex = this.aabb.startX + cutX - collider.aabb.endX;
            sy = this.aabb.startY - collider.aabb.startY;
            ey = this.aabb.startY - collider.aabb.endY;
            if (0 < sx && ex < 0 && 0 < sy && ey < 0 && -ey < d) {
                nx = 0;
                ny = -1;
                d = -ey;
            }
            if (d < Math.max(this.endX - this.startX, this.endY - this.startY)) {
                if (data !== undefined) {
                    data.e1 = this.entity;
                    data.e2 = collider.entity;
                    data.nx = nx;
                    data.ny = ny;
                    let base = (this.aabb.endX - this.aabb.startX + collider.aabb.endX - collider.aabb.startX);
                    data.px = (this.aabb.startX + this.aabb.endX) / 2 * (this.aabb.endX - this.aabb.startX) / base + (collider.aabb.startX + collider.aabb.endX) / 2 * (collider.aabb.endX - collider.aabb.startX) / base;
                    base = (this.aabb.endY - this.aabb.startY + collider.aabb.endY - collider.aabb.startY);
                    data.py = (this.aabb.startY + this.aabb.endY) / 2 * (this.aabb.endY - this.aabb.startY) / base + (collider.aabb.startY + collider.aabb.endY) / 2 * (collider.aabb.endY - collider.aabb.startY) / base;
                    data.depth = d;
                }
                return true;
            }
        } else if (collider instanceof CircleCollider) {
            // TODO: Should implement
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
        ctx.strokeLine(this.aabb.startX + this.cut + shiftX, this.aabb.startY + shiftY, this.aabb.endX - this.cut + shiftX, this.aabb.startY + shiftY);
        ctx.strokeLine(this.aabb.startX + shiftX, this.aabb.startY + this.cut + shiftY, this.aabb.startX + shiftX, this.aabb.endY - this.cut + shiftY);
        ctx.strokeLine(this.aabb.endX + shiftX, this.aabb.startY + this.cut + shiftY, this.aabb.endX + shiftX, this.aabb.endY - this.cut + shiftY);
        ctx.strokeLine(this.aabb.startX + this.cut + shiftX, this.aabb.endY + shiftY, this.aabb.endX - this.cut + shiftX, this.aabb.endY + shiftY);

        if (Engine.debug) {
            let me = 0;
            let you = 0;
            for (let it of this.collisions) {
                if (it.e1 === this.entity) {
                    me += 1;
                } else {
                    you += 1;
                }
            }
            // ctx.fillText(this.collisions.length + ``, this.aabb.startX + shiftX, this.aabb.startY + shiftY, 0.0, 0.0, 15, `red`);
            ctx.fillText(me + ``, this.aabb.startX + shiftX + 15, this.aabb.startY + shiftY, 0.0, 0.0, 15, `blue`);
            ctx.fillText(you + ``, this.aabb.startX + shiftX, this.aabb.startY + shiftY + 15, 0.0, 0.0, 15, `red`);
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
}
