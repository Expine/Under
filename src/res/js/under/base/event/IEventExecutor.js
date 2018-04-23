/**
 * Event executor interface
 * - ### Executes event and update, render event
 * @interface
 * @classdesc Event executor interface to execute event and update, render event
 */
class IEventExecutor extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Execute event
     * @abstract
     * @param {GameEvent} event Event
     */
    execute(event) {}

    /**
     * Update scene
     * @abstract
     * @param {number} dt Delta time
     */
    update(dt) {}

    /**
     * Render scene
     * @abstract
     * @param {Context} ctx Canvas context
     */
    render(ctx) {}
}
