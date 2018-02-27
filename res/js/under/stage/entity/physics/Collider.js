/**
 * Collider for judging collision
 * @classdesc collder for collisiion
 */
class Collider {
    /**
     * Get collider upper left x position
     * @interface
     * @return {number} upper left x position
     */
    getAABBStartX() {}

    /**
     * Get collider bottom right x position
     * @interface
     * @return {number} bottom right x position
     */
    getAABBEndX() {}

    /**
     * Get collider upper left y position
     * @interface
     * @return {number} upper left y position
     */
    getAABBStartY() {}

    /**
     * Get collider bottom right y position
     * @interface
     * @return {number} bottom right y position
     */
    getAABBEndY() {}

    /**
     * Get collider center x position
     * @interface
     * @return {number} center x position
     */
    getCenterX() {}

    /**
     * Get collider center y position
     * @interface
     * @return {number} center y position
     */
    getCenterY() {}

    /**
     * Get collider roughly radius
     * @interface
     * @return {number} roughly radius
     */
    getColliderRadius() {}

    /**
     * Judge whether position is in collider
     * @interface
     * @param {number} x x position
     * @param {number} y y position
     * @return {boolean} whether position is in collider
     */
    isInCollider(x, y) {}

    /**
     * Perform collision response
     * @param {Collider} collider
     * @param {number} shiftX Horizontal displacement
     * @param {number} shiftY Vertical displacement
     */
    collisionResponse(collider, shiftX, shiftY) {}


    /**
     * Judge whether collision
     * @interface
     * @param {Colllder} collider
     * @return {boolean} whether collision
     */
    isCollision(collider) {}

    /**
     * Perform collision response
     * @param {Collider} collider
     */
    collisionResponse(collider) {}


    /**
     * Update collide information
     * @interface
     * @param {number} dt delta time
     */
    update(dt) {}

    /**
     * Render collider for debug
     * @interface
     * @param {CanvasRenderingContext2D} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {}
}