import { GameEvent } from "./common/GameEvent";

/**
 * Event register interface
 * - Registers event
 * @interface
 * @classdesc Event register interface to registers event
 */
export interface IEventRegister {
    /**
     * Register event
     * @abstract
     * @param {GameEvent} event Target event
     */
    register(event: GameEvent): void;

    /**
     * Unregister event
     * @abstract
     * @param {GameEvent} event Target event
     */
    unregister(event: GameEvent): void;

    /**
     * Clear all events
     * @abstract
     */
    clear(): void;
}

/**
 * Type guard for IEventRegister
 */
export const isIEventRegister = (arg: any): arg is IEventRegister => arg !== null && arg.register !== undefined;
