import { Collider } from "../../../../base/stage/physics/collider/Collider";
import { CollisionData } from "../../../../base/stage/physics/collider/CollisionData";
import { MutableEntity } from "../../../../base/stage/entity/MutableEntity";
import { InfluentialEntity } from "../../../../base/stage/entity/InfluentialEntity";
import { Context } from "../../../../base/resources/image/Context";
import { RectangleCollider } from "./RectangleCollider";

/**
 * Circle collider
 * - Makes a collision judgment considered to be circular
 * @extends {Collider}
 * @classdesc Circle collider to make a collision judgment considered to be circular
 */
export class CircleCollider extends Collider {
    /**
     * Circle radius
     * @protected
     * @type {number}
     */
    protected radius: number;

    /**
     * Horizontal distance to shift from center
     * @protected
     * @type {number}
     */
    protected shiftX: number;
    /**
     * Vertical distance to shift from center
     * @protected
     * @type {number}
     */
    protected shiftY: number;

    /**
     * Center x position calculated by update
     * @protected
     * @type {number}
     */
    protected centerX: number;

    /**
     * Center y position calculated by update
     * @protected
     * @type {number}
     */
    protected centerY: number;

    /**
     * Circle collider constructor
     * @constructor
     * @param {number} radius Circle radius
     * @param {number} [shiftX = 0] Horizontal distance to shift from center
     * @param {number} [shiftY = 0] Vertical distance to shift from center
     */
    constructor(radius: number, shiftX: number = 0, shiftY: number = 0) {
        super();
        this.radius = radius;
        this.shiftX = shiftX;
        this.shiftY = shiftY;
        this.centerX = 0;
        this.centerY = 0;

        // calculate initial value
        this.update();
    }

    /**
     * Judge whether position is in collider
     * @override
     * @param {number} x X position
     * @param {number} y Y position
     * @return {boolean} whether position is in collider
     */
    isInCollider(x: number, y: number): boolean {
        const sx = this.centerX - x;
        const sy = this.centerY - y;
        return sx * sx + sy * sy <= this.radius * this.radius;
    }

    /**
     * Judge whether collision
     * @override
     * @param {Collider} collider Target collider
     * @param {CollisionData} [data=null] Pointer to save conflict information
     * @return {boolean} whether collision
     */
    isCollision(collider: Collider, data: CollisionData | null): boolean {
        if (collider instanceof CircleCollider) {
            let nx = collider.centerX - this.centerX;
            let ny = collider.centerY - this.centerY;
            const r = this.radius + collider.radius;
            if (nx * nx + ny * ny < r * r) {
                if (data !== null) {
                    let me = this.entity;
                    let you = collider.entity;
                    const nlen = Math.sqrt(nx * nx + ny * ny);
                    nx = nx / nlen;
                    ny = ny / nlen;
                    const px = this.centerX + this.radius * nx;
                    const py = this.centerY + this.radius * ny;
                    const depth = r - nlen;
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
                        data.register(me as MutableEntity, you as InfluentialEntity, nx, ny, px, py, depth);
                    }
                }
                return true;
            }
        } else if (collider instanceof RectangleCollider) {
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
    fixBound(startX: number, startY: number, endX: number, endY: number) {
        this.shiftX = startX;
        this.shiftY = startY;
        this.radius = Math.max(endX - startX, endY - startY) / 2;
        this.update();
    }

    /**
     * Update collide information
     * Called whenever coordinate information is updated
     * @override
     */
    update() {
        // AABB
        if (this.aabb !== null && this.entity !== null) {
            this.aabb.update(this.shiftX, this.shiftY, this.radius * 2 + this.shiftX, this.radius * 2 + this.shiftY, this.entity);
        }
        // Center position
        if (this.entity !== null) {
            this.centerX = this.entity.x + this.radius + this.shiftX;
            this.centerY = this.entity.y + this.radius + this.shiftY;
        }
    }

    /**
     * Render collider for debug
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx: Context, shiftX: number, shiftY: number) {
        ctx.strokeCircle(this.centerX + shiftX, this.centerY + shiftY, this.radius, 0, 2 * Math.PI, false, null, null);
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
        if ((me !== 0 || you !== 0) && this.aabb !== null) {
            ctx.fillText(me + ``, this.aabb.startX + shiftX + 15, this.aabb.startY + shiftY, 0.0, 0.0, 15, `blue`, null);
            ctx.fillText(you + ``, this.aabb.startX + shiftX, this.aabb.startY + shiftY + 15, 0.0, 0.0, 15, `red`, null);
        }
        // vector
        for (const it of this.collisions) {
            if (it.collided === this.entity || this.aabb === null) {
                continue;
            }
            ctx.strokeLine(
                this.aabb.startX + shiftX + this.centerX,
                this.aabb.startY + shiftY + this.centerY / 2,
                this.aabb.startX + shiftX + this.centerX + it.nx * 30 * (it.colliding === this.entity ? 1 : -1),
                this.aabb.startY + shiftY + this.centerY / 2 + it.ny * 30 * (it.colliding === this.entity ? 1 : -1),
                `red`, null);
        }
    }
}
