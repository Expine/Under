/**
 * Event manager
 * - ### Manages update and rendering event
 * @interface
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
        if (BaseUtil.implementsOf(this, IEventRegister)) {
            EventManager.register = this;
        }
    }

    /**
     * Get currently running event
     * @abstract
     * @return {Array<GameEvent>} Currently running events
     */
    getRunningEvents() {}

    /**
     * Clear all events
     * @abstract
     */
    clear() {}

    /**
     * Remove events from event manager
     * @param {Array<GameEvent>} removes List of event for removing
     */
    removeEvents(removes) {}

    /**
     * Update scene
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        let removes = [];
        for (let it of this.getRunningEvents()) {
            if (it.update(dt)) {
                removes.add(it);
            }
        }
        this.removeEvents(removes);
    }

    /**
     * Render scene
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        for (let it of this.getRunningEvents()) {
            it.render(ctx);
        }
    }
}

/**
 * Instance for singleton
 * @type {EventManager}
 */
EventManager.it = null;

/**
 * Instance for singleton
 * @type {IEventRegister}
 */
EventManager.register = null;
