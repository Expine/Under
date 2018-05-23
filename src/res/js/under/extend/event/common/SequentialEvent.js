/**
 * Seuqential event
 * - Updates and renders event
 * - Controls event
 * - ### Executes events continuously
 * @extends {GameEvent}
 * @implements {IEventOperator}
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
         * Next event number
         * @protected
         * @type {number}
         */
        this.nextEventNumber = 0;

        /**
         * List of running events
         * @protected
         * @type {Array<GameEvent>}
         */
        this.runningEvents = [];
    }

    /**
     * Add game event to execute
     * @param {GameEvent} event Game event to execute
     */
    addEvent(event) {
        this.events.push(event);
    }

    /**
     * Execute next event
     * @override
     */
    next() {
        if (this.nextEventNumber < this.events.length) {
            const event = this.events[this.nextEventNumber++];
            this.runningEvents.push(event);
            event.init();
        } else {
            this.op.next();
        }
    }

    /**
     * Delete event
     * @override
     * @param {GameEvent} event Target event
     */
    delete(event) {
        const index = this.runningEvents.indexOf(event);
        if (index >= 0) {
            this.runningEvents.splice(index, 1);
            event.destruct();
        }
    }

    /**
     * Get currently running event
     * @abstract
     * @return {Array<GameEvent>} Currently running events
     */
    getRunningEvents() {
        return this.runningEvents;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        super.init();
        this.nextEventNumber = 0;
        for (const it of this.events) {
            it.setEventOperator(this);
        }
        this.next();
    }

    /**
     * Destructor of event
     * @override
     */
    destruct() {
        for (const it of this.runningEvents) {
            it.destruct();
        }
    }

    /**
     * Update event
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether update is endped or not
     */
    update(dt) {
        const removes = [];
        for (const it of this.runningEvents) {
            if (it.update(dt)) {
                removes.push(it);
            }
        }
        for (const it of removes) {
            const index = this.runningEvents.indexOf(it);
            if (index >= 0) {
                this.runningEvents.splice(index, 1);
            }
        }
        return this.runningEvents.length === 0 && this.nextEventNumber >= this.events.length;
    }

    /**
     * Render event
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        for (const it of this.runningEvents) {
            it.render(ctx);
        }
    }
}
