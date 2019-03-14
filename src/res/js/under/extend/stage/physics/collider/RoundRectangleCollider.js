/**
 * Round rectangle collider
 * - Store collider data for judgeing collision
 * - Makes a collision judgment considered to be rectangle
 * - ### Makes a collision judgment considered to be rectangle taken a horn
 * @extends {Collider}
 * @classdesc Round rectangle collider to make a collision judgment considered to be rectangle taken a horn
 */
class RoundRectangleCollider extends RectangleCollider {
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
     * @override
     * @param {Colllder} collider Target collider
     * @param {CollisionData} [data=null] Pointer to save conflict information
     * @return {boolean} whether collision
     */
    isCollision(collider, data = null) {
        if (collider instanceof RoundRectangleCollider) {
            const cutX = this.cut;
            const cutY = this.cut;
            // In the meantime, the opponent is regarded as a rectangle
            const cutCX = collider.cut;
            const cutCY = collider.cut;
            let nx = 0;
            let ny = 0;
            let d = Number.MAX_SAFE_INTEGER;
            let collided = false;


            let sx = this.aabb.endX - cutX - collider.aabb.startX - cutCX;
            let ex = this.aabb.startX + cutX - collider.aabb.endX + cutCX;
            let sy = this.aabb.endY - collider.aabb.startY;
            let ey = this.aabb.startY - collider.aabb.endY;
            let len = Math.abs(sy) < Math.abs(ey) ? sy : ey;
            if (0 < sx && ex < 0 && 0 < sy && ey < 0) {
                d = Math.abs(len);
                nx = 0;
                ny = Math.sign(len);
                collided = true;
            }

            sx = this.aabb.endX - cutX - collider.aabb.startX;
            ex = this.aabb.startX + cutX - collider.aabb.endX;
            sy = this.aabb.endY - collider.aabb.startY - cutCY;
            ey = this.aabb.startY - collider.aabb.endY + cutCY;
            len = Math.abs(sx) < Math.abs(ex) ? sx : ex;
            if (0 < sx && ex < 0 && 0 < sy && ey < 0 && Math.abs(len) < d) {
                d = Math.abs(len);
                nx = Math.sign(len);
                ny = 0;
                collided = true;
            }

            sx = this.aabb.endX - collider.aabb.startX - cutCX;
            ex = this.aabb.startX - collider.aabb.endX + cutCX;
            sy = this.aabb.endY - cutY - collider.aabb.startY;
            ey = this.aabb.startY + cutY - collider.aabb.endY;
            len = Math.abs(sx) < Math.abs(ex) ? sx : ex;
            if (0 < sx && ex < 0 && 0 < sy && ey < 0 && Math.abs(len) < d) {
                d = Math.abs(len);
                nx = Math.sign(len);
                ny = 0;
                collided = true;
            }

            sx = this.aabb.endX - collider.aabb.startX;
            ex = this.aabb.startX - collider.aabb.endX;
            sy = this.aabb.endY - cutY - collider.aabb.startY - cutCY;
            ey = this.aabb.startY + cutY - collider.aabb.endY + cutCY;
            len = Math.abs(sx) < Math.abs(ex) ? sx : ex;
            if (0 < sx && ex < 0 && 0 < sy && ey < 0 && Math.abs(len) < d) {
                d = Math.abs(len);
                nx = Math.sign(len);
                ny = 0;
                collided = true;
            }

            if (collided) {
                if (data !== null) {
                    let me = this.entity;
                    let you = collider.entity;
                    if (me instanceof MutableEntity && me.body.velocityX * nx + me.body.velocityY * ny > 0) {} else if (you instanceof MutableEntity && you.body.velocityX * nx + you.body.velocityY * ny < 0) {
                        const swap = me;
                        me = you;
                        you = swap;
                        nx = -nx;
                        ny = -ny;
                    } else if (!me instanceof MutableEntity || !you instanceof InfluentialEntity) {
                        console.log(`Error: Colliding entity should be mutable`);
                    }
                    const px = me.x + nx * d;
                    const py = me.y + ny * d;
                    data.register(me, you, nx, ny, px, py, d);
                }
                return true;
            }
        } else if (collider instanceof RectangleCollider) {
            const cutX = this.cut;
            const cutY = this.cut;
            let nx = 0;
            let ny = 0;
            let d = Number.MAX_SAFE_INTEGER;
            let collided = false;

            let sx = this.aabb.endX - cutX - collider.aabb.startX;
            let ex = this.aabb.startX + cutX - collider.aabb.endX;
            let sy = this.aabb.endY - collider.aabb.startY;
            let ey = this.aabb.startY - collider.aabb.endY;
            let len = Math.abs(sy) < Math.abs(ey) ? sy : ey;
            if (0 < sx && ex < 0 && 0 < sy && ey < 0) {
                d = Math.abs(len);
                nx = 0;
                ny = Math.sign(len);
                collided = true;
            }

            sx = this.aabb.endX - collider.aabb.startX;
            ex = this.aabb.startX - collider.aabb.endX;
            sy = this.aabb.endY - cutY - collider.aabb.startY;
            ey = this.aabb.startY + cutY - collider.aabb.endY;
            len = Math.abs(sx) < Math.abs(ex) ? sx : ex;
            if (0 < sx && ex < 0 && 0 < sy && ey < 0 && Math.abs(len) < d) {
                d = Math.abs(len);
                nx = Math.sign(len);
                ny = 0;
                collided = true;
            }

            if (collided) {
                if (data !== null) {
                    let me = this.entity;
                    let you = collider.entity;
                    if (me instanceof MutableEntity && me.body.velocityX * nx + me.body.velocityY * ny > 0) {} else if (you instanceof MutableEntity && you.body.velocityX * nx + you.body.velocityY * ny < 0) {
                        const swap = me;
                        me = you;
                        you = swap;
                        nx = -nx;
                        ny = -ny;
                    } else if (!me instanceof MutableEntity || !you instanceof InfluentialEntity) {
                        console.log(`Error: Colliding entity should be mutable and collided entity should be influential`);
                    }
                    const px = me.x + nx * d;
                    const py = me.y + ny * d;
                    data.register(me, you, nx, ny, px, py, d);
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
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX, shiftY) {
        // rect
        ctx.strokeLine(this.aabb.startX + this.cut + shiftX, this.aabb.startY + shiftY, this.aabb.endX - this.cut + shiftX, this.aabb.startY + shiftY);
        ctx.strokeLine(this.aabb.startX + shiftX, this.aabb.startY + this.cut + shiftY, this.aabb.startX + shiftX, this.aabb.endY - this.cut + shiftY);
        ctx.strokeLine(this.aabb.endX + shiftX, this.aabb.startY + this.cut + shiftY, this.aabb.endX + shiftX, this.aabb.endY - this.cut + shiftY);
        ctx.strokeLine(this.aabb.startX + this.cut + shiftX, this.aabb.endY + shiftY, this.aabb.endX - this.cut + shiftX, this.aabb.endY + shiftY);

        // collision
        let me = 0;
        let you = 0;
        for (const it of this.collisions) {
            if (it.colliding === this.entity) {
                me += 1;
            } else {
                you += 1;
            }
        }
        if (me !== 0 || you !== 0) {
            ctx.fillText(me + ``, this.aabb.startX + shiftX + 15, this.aabb.startY + shiftY, 0.0, 0.0, 15, `blue`);
            ctx.fillText(you + ``, this.aabb.startX + shiftX, this.aabb.startY + shiftY + 15, 0.0, 0.0, 15, `red`);
        }
        // vector
        for (const it of this.collisions) {
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
