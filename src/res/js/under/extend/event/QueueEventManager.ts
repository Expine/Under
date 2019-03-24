import { EventManager } from "../../base/event/EventManager";
import { IEventRegister } from "../../base/event/IEventRegister";
import { IEventOperator } from "../../base/event/IEventOperater";
import { GameEvent } from "../../base/event/common/GameEvent";

/**
 * Queue event manager
 * - Uses the queue to manage events
 * @extends {EventManager}
 * @implements {IEventRegister}
 * @implements {IEventOperator}
 * @classdesc Queue event manager to use the queue to manage events
 */
export class QueueEventManager extends EventManager implements IEventRegister, IEventOperator {
    /**
     * Event queue
     * @protected
     * @type {Array<GameEvent>}
     */
    protected events: Array<GameEvent>;

    /**
     * List of running events
     * @protected
     * @type {Array<GameEvent>}
     */
    protected runningEvents: Array<GameEvent>;

    /**
     * Queue event manager constructor
     * @constructor
     */
    constructor() {
        super();

        this.events = [];
        this.runningEvents = [];
    }

    /**
     * Register event
     * @override
     * @param {GameEvent} event Target vent
     */
    register(event: GameEvent) {
        event.setEventOperator(this);
        this.events.push(event);
        // if event is first event, execute it
        if (this.events.length === 1) {
            this.next();
        }
    }

    /**
     * Unregister event
     * @override
     * @param {GameEvent} event Target vent
     */
    unregister(event: GameEvent) {
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
     * Clear all events
     * @override
     */
    clear() {
        for (const it of this.runningEvents) {
            it.destruct();
        }
        this.events.length = 0;
        this.runningEvents.length = 0;
    }

    /**
     * Execute next event
     * @override
     */
    next() {
        const event = this.events[0];
        if (event !== undefined) {
            this.events.splice(0, 1);
            this.runningEvents.push(event);
            event.init();
        }
    }

    /**
     * Delete event
     * @override
     * @param {GameEvent} event Target event
     */
    delete(event: GameEvent) {
        this.unregister(event);
    }

    /**
     * Get currently running event
     * @override
     * @return {Array<GameEvent>} Currently running events
     */
    getRunningEvents(): Array<GameEvent> {
        return this.runningEvents;
    }

    /**
     * Remove events from event manager
     * @protected
     * @param {Array<GameEvent>} removes List of event for removing
     */
    removeEvents(removes: Array<GameEvent>) {
        for (const it of removes) {
            this.unregister(it);
        }
    }

    /**
     * Initialize event manager
     * @override
     */
    init() { }
}
