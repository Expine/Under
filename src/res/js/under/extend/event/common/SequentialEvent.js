/**
 * Seuqential event
 * - Updates and renders event
 * - Controls event
 * - ### Executes events continuously
 * @classdesc Seuqential event to execute events continuously
 */
class SequentialEvent extends GameEvent /* IEventOperator */ { // eslint-disable-line  no-unused-vars
    /**
     * Seuqential event constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Event list
         * @protected
         * @type {Array<GameEvent>}
         */
        this.events = [];
        /**
         * Updating events list
         * @protected
         * @type {Array<GameEvent>}
         */
        this.updatingEvents = [];
        /**
         * Rendering events list
         * @protected
         * @type {Array<GameEvent>}
         */
        this.renderingEvents = [];
    }

    /**
     * Execute next event
     * @override
     */
    next() {
        let event = this.events[0];
        if (event !== undefined) {
            this.events.splice(0, 1);
            this.updatingEvents.push(event);
            this.renderingEvents.push(event);
            event.init();
        } else {
            this.op.next();
        }
    }

    /**
     * Stop event update
     * @override
     * @param {GameEvent} event Target event
     */
    stopUpdate(event) {
        let index = this.updatingEvents.indexOf(event);
        if (index != -1) {
            this.updatingEvents.splice(index, 1);
            if (this.renderingEvents.indexOf(event) == -1) {
                event.destruct();
            }
        }
    }

    /**
     * Stop event rendering
     * @override
     * @param {GameEvent} event Target event
     */
    stopRender(event) {
        let index = this.renderingEvents.indexOf(event);
        if (index != -1) {
            this.renderingEvents.splice(index, 1);
            if (this.updatingEvents.indexOf(event) == -1) {
                event.destruct();
            }
        }
    }

    /**
     * Get running events by name
     * @override
     * @param {name} Event name
     * @return {Array<GameEvent>} Running events that has name
     */
    getRunningEventsByName(name) {
        let ret = this.op.getRunningEventsByName(name);
        for (let it of this.updatingEvents) {
            if (name == it.getName() && ret.indexOf(it) == -1) {
                ret.push(it);
            }
        }
        for (let it of this.renderingEvents) {
            if (name == it.getName() && ret.indexOf(it) == -1) {
                ret.push(it);
            }
        }
        return ret;
    }

    /**
     * Add game event to execute
     * @param {GameEvent} event Game event to execute
     */
    addEvent(event) {
        this.events.push(event);
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        super.init();
        for (let it of this.events) {
            it.setEventOperator(this);
        }
        this.next();
    }

    /**
     * Destructor of event
     * @override
     */
    destruct() {
        for (let list of [this.events, this.updatingEvents, this.renderingEvents]) {
            for (let it of list) {
                it.destruct();
            }
        }
    }

    /**
     * Update event
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        for (let it of this.updatingEvents) {
            it.update(dt);
        }
        if (this.events.length == 0 && this.updatingEvents.length == 0) {
            this.op.stopUpdate(this);
        }
    }

    /**
     * Render event
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        for (let it of this.renderingEvents) {
            it.render(ctx);
        }
        if (this.events.length == 0 && this.renderingEvents.length == 0) {
            this.op.stopRender(this);
        }
    }
}
