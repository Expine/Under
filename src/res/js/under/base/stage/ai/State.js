/**
 * State of ai
 * Determine the operation by AI according to the state
 * @classdesc State of ai to determine the operation
 */
class State { // eslint-disable-line  no-unused-vars
    /**
     * Set entity for targeting
     * @param {Entity} entity
     */
    setEntity(entity) {
        this.entity = entity;
    }

    /**
     * Apply AI and decide action
     * @interface
     * @param {number} dt - delta time
     * @return {boolean} Whether decided on action
     */
    apply(dt) {}

    /**
     * Render entity by this tate
     * @interface
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {}
}
