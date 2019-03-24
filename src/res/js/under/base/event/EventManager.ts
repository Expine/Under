import { isIEventRegister, IEventRegister } from './IEventRegister';
import { GameEvent } from './common/GameEvent';
import { Context } from '../resources/image/Context';
/**
 * Event manager
 * - ### Manages update and rendering event
 * @abstract
 * @classdesc Event manager to manage update and rendering event
 */
export abstract class EventManager {
    /**
     * Instance for singleton
     * @type {IEventRegister}
     */
    static it: IEventRegister;

    /**
     * Event manager constructor
     * @constructor
     */
    constructor() {
        // set singleton
        if (isIEventRegister(this)) {
            EventManager.it = this;
        }
    }

    /**
     * Get currently running event
     * @abstract
     * @return {Array<GameEvent>} Currently running events
     */
    abstract getRunningEvents(): Array<GameEvent>;

    /**
     * Remove events from event manager
     * @abstract
     * @protected
     * @param {Array<GameEvent>} removes List of event for removing
     */
    abstract removeEvents(removes: Array<GameEvent>): void;

    /**
     * Initialize event manager
     * @abstract
     */
    abstract init(): void;

    /**
     * Update event manager
     * @override
     * @param {number} dt Delta time
     */
    update(dt: number) {
        const removes = [];
        for (const it of this.getRunningEvents()) {
            if (it.update(dt)) {
                removes.push(it);
            }
        }
        this.removeEvents(removes);
    }

    /**
     * Render event manager
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx: Context) {
        for (const it of this.getRunningEvents()) {
            it.render(ctx);
        }
    }
}
