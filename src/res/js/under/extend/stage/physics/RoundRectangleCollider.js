/**
 * Rectangle collider taken a horn
 * @classdesc Collider for rectangle taken a horn
 */
class RoundRectangleCollider extends RectangleCollider { // eslint-disable-line  no-unused-vars
    /**
     * Rectangle collider constructor
     * @constructor
     * @param {Entity} entity Entity attaching this
     * @param {number} startX X coordinate of upper left corner of rectangle
     * @param {number} startY Y coordinate of upper left corner of rectangle
     * @param {number} width Width of rectangle
     * @param {number} height Height of rectangle
     * @param {number} cut Amount of taken horn
     * @param {bool} [isResponse=true] Whether to perform collision response or not
     */
    constructor(entity, startX, startY, width, height, cut, isResponse = true) {
        super(entity, startX, startY, width, height, isResponse);
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
     * @param {number} dt delta time
     * @param {CollisionData} data Pointer to save conflict information
     * @return {boolean} whether collision
     */
    isCollision(collider, dt, data) {
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
                    data.depth = d;
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
        ctx.strokeLine(this.aabb.startX + this.cut + shiftX, this.aabb.startY + shiftY, this.aabb.endX - this.cut + shiftX, this.aabb.startY + shiftY);
        ctx.strokeLine(this.aabb.startX + shiftX, this.aabb.startY + this.cut + shiftY, this.aabb.startX + shiftX, this.aabb.endY - this.cut + shiftY);
        ctx.strokeLine(this.aabb.endX + shiftX, this.aabb.startY + this.cut + shiftY, this.aabb.endX + shiftX, this.aabb.endY - this.cut + shiftY);
        ctx.strokeLine(this.aabb.startX + this.cut + shiftX, this.aabb.endY + shiftY, this.aabb.endX - this.cut + shiftX, this.aabb.endY + shiftY);
        /*
        ctx.fillText(this.collisions.length + ``, this.aabb.startX + shiftX, this.aabb.startY + shiftY, 0.0, 0.0, 30, `red`);
        for (let it of this.collisions) {
            var hueVal = it.e1.imageID + (it.e2.imageID << 5);
            ctx.strokeLine(
                this.aabb.startX + shiftX + (this.endX - this.startX) / 2,
                this.aabb.startY + shiftY + (this.endY - this.startY) / 2,
                this.aabb.startX + shiftX + (this.endX - this.startX) / 2 + it.nx * 30 * (it.e1 === this.entity ? 1 : -1),
                this.aabb.startY + shiftY + (this.endY - this.startY) / 2 + it.ny * 30 * (it.e1 === this.entity ? 1 : -1),
                hueVal);
        }
        */
    }
}
