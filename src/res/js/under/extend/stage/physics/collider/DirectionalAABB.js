/**
 * Axis Aligned Bounding Box
 * - Uses for rough collision determination
 * - Decides from 4 vertices
 * - ### Considers the direction
 * @implements {SimpleAABB}
 * @classdesc Directional Axis Aligned Bounding Box to consider the direction
 */
class DirectionalAABB extends SimpleAABB { // eslint-disable-line  no-unused-vars
    /**
     * Update AABB
     * @override
     * @param {number} startX X coordinate of the upper left
     * @param {number} startY Y coordinate of the upper left
     * @param {number} endX X coordinate of the lower right
     * @param {number} endY Y coordinate of the lower right
     * @param {InfluentialEntity} entity Entity attaced it
     */
    update(startX, startY, endX, endY, entity) {
        if (entity instanceof MutableEntity) {
            if (entity.directionX >= 0) {
                this.startXVal = entity.x + startX;
                this.endXVal = entity.x + endX;
            } else {
                this.startXVal = entity.width - endX + entity.x;
                this.endXVal = entity.width - startX + entity.x;
            }
            if (entity.directionY <= 0) {
                this.startYVal = entity.y + startY;
                this.endYVal = entity.y + endY;
            } else {
                this.startYVal = entity.height - endY + entity.y;
                this.endYVal = entity.height - startY + entity.y;
            }
        }
    }
}
