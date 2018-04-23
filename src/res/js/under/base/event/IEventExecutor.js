/**
 * Event executor interface
 * - ### Executes event and update, render event
 * @classdesc Event executor interface to execute event and update, render event
 */
class IEventExecutor extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Execute event
     * @interface
     * @param {GameEvent} event Event
     */
    execute(event) {}

    /**
     * Update scene
     * @interface
     * @param {number} dt Delta time
     */
    update(dt) {}

    /**
     * Render scene
     * @interface
     * @param {Context} ctx Canvas context
     */
    render(ctx) {}
}
