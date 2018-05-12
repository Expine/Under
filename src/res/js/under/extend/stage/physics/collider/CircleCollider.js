/**
 * Circle collider
 * - Store collider data for judgeing collision
 * - ### Makes a collision judgment considered to be circular
 * @extends {Collider}
 * @classdesc Circle collider to make a collision judgment considered to be circular
 */
class CircleCollider extends Collider { // eslint-disable-line  no-unused-vars
    /**
     * Circle collider constructor
     * @constructor
     * @param {number} radius Circle radius
     * @param {number} [shiftX = 0] Horizontal distance to shift from center
     * @param {number} [shiftY = 0] Vertical distance to shift from center
     */
    constructor(radius, shiftX = 0, shiftY = 0) {
        super();
        /**
         * Circle radius
         * @protected
         * @type {number}
         */
        this.radius = radius;

        /**
         * Horizontal distance to shift from center
         * @protected
         * @type {number}
         */
        this.shiftX = shiftX;
        /**
         * Vertical distance to shift from center
         * @protected
         * @type {number}
         */
        this.shiftY = shiftY;

        /**
         * Center x position calculated by update
         * @protected
         * @type {number}
         */
        this.centerX = 0;

        /**
         * Center y position calculated by update
         * @protected
         * @type {number}
         */
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
    isInCollider(x, y) {
        let sx = this.centerX - x;
        let sy = this.centerY - y;
        return sx * sx + sy * sy <= this.radius * this.radius;
    }

    /**
     * Judge whether collision
     * @override
     * @param {Colllder} collider Target collider
     * @param {CollisionData} data Pointer to save conflict information
     * @return {boolean} whether collision
     */
    isCollision(collider, data) {
        if (collider instanceof CircleCollider) {
            let nx = collider.centerX - this.centerX;
            let ny = collider.centerY - this.centerY;
            let r = this.radius + collider.radius;
            if (nx * nx + ny * ny < r * r) {
                if (data !== undefined) {
                    let me = this.entity;
                    let you = collider.entity;
                    let nlen = Math.sqrt(nx * nx + ny * ny);
                    nx = nx / nlen;
                    ny = ny / nlen;
                    let px = this.centerX + this.radius * nx;
                    let py = this.centerY + this.radius * ny;
                    let depth = r - nlen;
                    if (me instanceof MutableEntity && me.body.velocityX * nx + me.body.velocityY * ny > 0) {} else if (you instanceof MutableEntity && you.body.velocityX * nx + you.body.velocityY * ny < 0) {
                        let swap = me;
                        me = you;
                        you = swap;
                        nx = -nx;
                        ny = -ny;
                    } else if (!me instanceof MutableEntity || !you instanceof InfluentialEntity) {
                        console.log(`Error: Colliding entity should be mutable and collided entity should be influential`);
                    }
                    data.register(me, you, nx, ny, px, py, depth);
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
    fixBound(startX, startY, endX, endY) {
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
        this.aabb.update(this.shiftX, this.shiftY, this.radius * 2 + this.shiftX, this.radius * 2 + this.shiftY, this.entity);
        // Center position
        this.centerX = this.entity.x + this.radius + this.shiftX;
        this.centerY = this.entity.y + this.radius + this.shiftY;
    }

    /**
     * Render collider for debug
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX, shiftY) {
        ctx.strokeCircle(this.centerX + shiftX, this.centerY + shiftY, this.radius, 0, 2 * Math.PI, false);
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
            if (it.e2 === this.entity) {
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
