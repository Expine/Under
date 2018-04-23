/**
 * Event manager
 * - Executes event and update, render event
 * - Controls event
 * - ### Manages update and rendering event
 * @classdesc Event manager to manage update and rendering event
 */
class EventManager /* IEventExecutor, IEventOperator */ { // eslint-disable-line  no-unused-vars
    /**
     * Event manager constructor
     * @constructor
     */
    constructor() {
        // set singleton
        EventManager.exec = this;
    }

    /**
     * Get currently updating event
     * @interface
     * @protected
     * @return {Array<GameEvent>} Updating events
     */
    getUpdatingEvents() {}

    /**
     * Get currently rendering event
     * @interface
     * @protected
     * @return {Array<GameEvent>} Rendering events
     */
    getRenderingEvents() {}

    /**
     * Update scene
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        for (let it of this.getUpdatingEvents()) {
            it.update(dt);
        }
    }

    /**
     * Render scene
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        for (let it of this.getRenderingEvents()) {
            it.render(ctx);
        }
    }
}

/**
 * Instance for singleton
 * @type {IEventExecutor}
 */
EventManager.exec = null;
