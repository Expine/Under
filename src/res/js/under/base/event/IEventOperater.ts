import { GameEvent } from "./common/GameEvent";

/**
 * Event operator interface
 * - Controls event
 * @interface
 * @classdesc Event operator interface to control event
 */
export interface IEventOperator {
    /**
     * Execute next event
     * @abstract
     */
    next(): void;

    /**
     * Delete event
     * @abstract
     * @param {GameEvent} event Target event
     */
    delete(event: GameEvent): void;

    /**
     * Get currently running event
     * @abstract
     * @return {Array<GameEvent>} Currently running events
     */
    getRunningEvents(): Array<GameEvent>;
}
