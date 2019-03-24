import { GameEvent } from "../../../base/event/common/GameEvent";
import { IEventOperator } from "../../../base/event/IEventOperater";
import { Context } from "../../../base/resources/image/Context";

/**
 * Seuqential event
 * - Executes events continuously
 * @extends {GameEvent}
 * @implements {IEventOperator}
 * @classdesc Seuqential event to execute events continuously
 */
export class SequentialEvent extends GameEvent implements IEventOperator {
    /**
     * Event list
     * @protected
     * @type {Array<GameEvent>}
     */
    protected events: Array<GameEvent>;
    /**
     * Next event number
     * @protected
     * @type {number}
     */
    protected nextEventNumber: number;

    /**
     * List of running events
     * @protected
     * @type {Array<GameEvent>}
     */
    protected runningEvents: Array<GameEvent>;

    /**
     * Seuqential event constructor
     * @constructor
     */
    constructor() {
        super();

        this.events = [];
        this.nextEventNumber = 0;
        this.runningEvents = [];
    }

    /**
     * Add game event to execute
     * @param {GameEvent} event Game event to execute
     */
    addEvent(event: GameEvent) {
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
            if (this.op !== null) {
                this.op.next();
            }
        }
    }

    /**
     * Delete event
     * @override
     * @param {GameEvent} event Target event
     */
    delete(event: GameEvent) {
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
    getRunningEvents(): Array<GameEvent> {
        return this.runningEvents;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
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
    update(dt: number): boolean {
        const removes = [];
        for (const it of this.runningEvents) {
            if (it.update(dt)) {
                removes.push(it);
            }
        }
        for (const it of removes) {
            const index = this.runningEvents.indexOf(it);
            if (index >= 0) {
                it.destruct();
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
    render(ctx: Context) {
        for (const it of this.runningEvents) {
            it.render(ctx);
        }
    }
}
