/**
 * Event manager
 * - ### Manages update and rendering event
 * @classdesc Event manager to manage update and rendering event
 */
class EventManager { // eslint-disable-line  no-unused-vars
    /**
     * Event manager constructor
     * @constructor
     */
    constructor() {
        // set singleton
        EventManager.it = this;
    }

    /**
     * Enqueue event for preparing to run it
     * @interface
     * @param {GameEvent} event Event
     */
    enqueueEvent(event) {}

    /**
     * Dequeue event for preparing to remove it
     * @interface
     */
    dequeueEvent() {}

    /**
     * Get currently running event
     * @interface
     * @protected
     * @return {GameEvent} Running event (if it not exists, return null)
     */
    getEvent() {}

    /**
     * Update scene
     * @param {number} dt Delta time
     */
    update(dt) {
        let event = this.getEvent();
        if (event !== null) {
            this.getEvent().update(dt);
        }
    }

    /**
     * Render scene
     * @interface
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        let event = this.getEvent();
        if (event !== null) {
            event.render(ctx);
        }
    }
}

/**
 * Instance for singleton
 * @type {EventManager}
 */
EventManager.it = null;
