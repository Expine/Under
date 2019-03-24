import { RectangleCollider } from "./RectangleCollider";
import { Collider } from "../../../../base/stage/physics/collider/Collider";
import { CollisionData } from "../../../../base/stage/physics/collider/CollisionData";
import { MutableEntity } from "../../../../base/stage/entity/MutableEntity";
import { InfluentialEntity } from "../../../../base/stage/entity/InfluentialEntity";
import { CircleCollider } from "./CircleCollider";
import { Context } from "../../../../base/resources/image/Context";

/**
 * Round rectangle collider
 * - Makes a collision judgment considered to be rectangle taken a horn
 * @extends {Collider}
 * @classdesc Round rectangle collider to make a collision judgment considered to be rectangle taken a horn
 */
export class RoundRectangleCollider extends RectangleCollider {
    /**
     * Amount of taken horn
     * @protected
     * @type {number}
     */
    protected cut: number;

    /**
     * Rectangle collider constructor
     * @constructor
     * @param {number} startX X coordinate of upper left corner of rectangle
     * @param {number} startY Y coordinate of upper left corner of rectangle
     * @param {number} width Width of rectangle
     * @param {number} height Height of rectangle
     * @param {number} cut Amount of taken horn
     */
    constructor(startX: number, startY: number, width: number, height: number, cut: number) {
        super(startX, startY, width, height);
        this.cut = cut;
    }

    /**
     * Judge whether collision
     * @override
     * @param {Collider} collider Target collider
     * @param {CollisionData} [data=null] Pointer to save conflict information
     * @return {boolean} whether collision
     */
    isCollision(collider: Collider, data: CollisionData | null): boolean {
        if (collider instanceof RoundRectangleCollider) {
            if (this.aabb === null || collider.aabb === null) {
                return false;
            }

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
                    if (me instanceof MutableEntity && me.body !== null && me.body.velocityX * nx + me.body.velocityY * ny > 0) {

                    } else if (you instanceof MutableEntity && you.body !== null && you.body.velocityX * nx + you.body.velocityY * ny < 0) {
                        const swap = me;
                        me = you;
                        you = swap;
                        nx = -nx;
                        ny = -ny;
                    } else if (!(me instanceof MutableEntity) || !(you instanceof InfluentialEntity)) {
                        // console.log(`Error: Colliding entity should be mutable`);
                    }
                    if (me !== null && you !== null) {
                        const px = me.x + nx * d;
                        const py = me.y + ny * d;
                        data.register(me as MutableEntity, you as InfluentialEntity, nx, ny, px, py, d);
                    }
                }
                return true;
            }
        } else if (collider instanceof RectangleCollider) {
            if (this.aabb === null || collider.aabb === null) {
                return false;
            }

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
                    if (me instanceof MutableEntity && me.body !== null && me.body.velocityX * nx + me.body.velocityY * ny > 0) {

                    } else if (you instanceof MutableEntity && you.body !== null && you.body.velocityX * nx + you.body.velocityY * ny < 0) {
                        const swap = me;
                        me = you;
                        you = swap;
                        nx = -nx;
                        ny = -ny;
                    } else if (!(me instanceof MutableEntity) || !(you instanceof InfluentialEntity)) {
                        // console.log(`Error: Colliding entity should be mutable and collided entity should be influential`);
                    }
                    if (me !== null && you !== null) {
                        const px = me.x + nx * d;
                        const py = me.y + ny * d;
                        data.register(me as MutableEntity, you as InfluentialEntity, nx, ny, px, py, d);
                    }
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
    render(ctx: Context, shiftX: number, shiftY: number) {
        if (this.aabb === null) {
            return;
        }
        // rect
        ctx.strokeLine(this.aabb.startX + this.cut + shiftX, this.aabb.startY + shiftY, this.aabb.endX - this.cut + shiftX, this.aabb.startY + shiftY, null, null);
        ctx.strokeLine(this.aabb.startX + shiftX, this.aabb.startY + this.cut + shiftY, this.aabb.startX + shiftX, this.aabb.endY - this.cut + shiftY, null, null);
        ctx.strokeLine(this.aabb.endX + shiftX, this.aabb.startY + this.cut + shiftY, this.aabb.endX + shiftX, this.aabb.endY - this.cut + shiftY, null, null);
        ctx.strokeLine(this.aabb.startX + this.cut + shiftX, this.aabb.endY + shiftY, this.aabb.endX - this.cut + shiftX, this.aabb.endY + shiftY, null, null);

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
            ctx.fillText(me + ``, this.aabb.startX + shiftX + 15, this.aabb.startY + shiftY, 0.0, 0.0, 15, `blue`, null);
            ctx.fillText(you + ``, this.aabb.startX + shiftX, this.aabb.startY + shiftY + 15, 0.0, 0.0, 15, `red`, null);
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
                `red`, null);
        }
    }
}
