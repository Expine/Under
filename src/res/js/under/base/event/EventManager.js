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
        if (BaseUtil.implementsOf(this, IEventRegister)) {
            EventManager.it = this;
        }
    }

    /**
     * Get currently running event
     * @abstract
     * @return {Array<GameEvent>} Currently running events
     */
    getRunningEvents() {}

    /**
     * Remove events from event manager
     * @abstract
     * @protected
     * @param {Array<GameEvent>} removes List of event for removing
     */
    removeEvents(removes) {}

    /**
     * Update scene
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        const removes = [];
        for (const it of this.getRunningEvents()) {
            if (it.update(dt)) {
                removes.push(it);
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
        for (const it of this.getRunningEvents()) {
            it.render(ctx);
        }
    }
}

/**
 * Instance for singleton
 * @type {IEventRegister}
 */
EventManager.it = null;
