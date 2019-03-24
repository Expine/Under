import { GameEvent } from "../../../event/common/GameEvent";

/**
 * Event entity interface
 * - It can hold event and fire it
 * @interface
 * @classdesc Event entity interface that can hold event and fire it
 */
export interface IEventEntity {
    /**
     * Set game event
     * @abstract
     * @param {GameEvent} event Stage event
     */
    setEvent(event: GameEvent): void;

    /**
     * Get stage event
     * @abstract
     * @return {GameEvent} Stage event
     */
    getEvent(): GameEvent | null;

    /**
     * Fires event
     * @abstract
     */
    fire(): void;
}

/**
 * Type guard for IEventEntity
 */
export const isIEventEntity = (arg: any): arg is IEventEntity => arg !== null && arg.fire !== undefined;

