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
        let event = this.events[0];
        if (event !== undefined) {
            this.events.splice(0, 1);
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
        let index = this.events.indexOf(event);
        if (index >= 0) {
            this.events.splice(index, 1);
        }
        index = this.runningEvents.indexOf(event);
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
        for (let it of this.runningEvents) {
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
        let removes = [];
        for (let it of this.runningEvents) {
            if (it.update(dt)) {
                removes.push(it);
            }
        }
        for (let it of removes) {
            let index = this.runningEvents.indexOf(it);
            if (index >= 0) {
                this.runningEvents.splice(index, 1);
            }
        }
        return this.runningEvents.length == 0 && this.events.length == 0;
    }

    /**
     * Render event
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        for (let it of this.runningEvents) {
            it.render(ctx);
        }
    }
}
