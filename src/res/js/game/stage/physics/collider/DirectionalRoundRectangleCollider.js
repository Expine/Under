/**
 * Directional round rectangle collider
 * - Store collider data for judgeing collision
 * - Makes a collision judgment considered to be rectangle
 * - Makes a collision judgment considered to be rectangle taken a horn
 * - - ### Considers the direction
 * @extends {RoundRectangleCollider}
 * @classdesc Directional round rectangle collider considered the direction
 */
class DirectionalRoundRectangleCollider extends RoundRectangleCollider { // eslint-disable-line  no-unused-vars
    /**
     * Update collide information
     * Called whenever coordinate information is updated
     * @override
     */
    update() {
        // AABB
        if (this.entity.directionX >= 0) {
            this.aabb.startX = this.entity.x + this.startX;
            this.aabb.endX = this.entity.x + this.endX;
        } else {
            this.aabb.startX = this.entity.width - this.endX + this.entity.x;
            this.aabb.endX = this.entity.width - this.startX + this.entity.x;
        }
        if (this.entity.directionY <= 0) {
            this.aabb.startY = this.entity.y + this.startY;
            this.aabb.endY = this.entity.y + this.endY;
        } else {
            this.aabb.startY = this.entity.height - this.endY + this.entity.y;
            this.aabb.endY = this.entity.height - this.startY + this.entity.y;
        }
    }
}
