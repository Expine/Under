/**
 * Game event
 * - ### Updates and renders event
 * @classdesc Game event to update and render event
 */
class GameEvent { // eslint-disable-line  no-unused-vars
    /**
     * Initialize event
     * @interface
     */
    init() {}

    /**
     * Update event
     * @interface
     * @param {number} dt Delta time
     */
    update(dt) {}

    /**
     * Render event
     * @interface
     * @param {Context} ctx Canvas context
     */
    render(ctx) {}
}
