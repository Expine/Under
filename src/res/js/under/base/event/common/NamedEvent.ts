import { GameEvent } from "./GameEvent";

/**
 * Named event
 * - Identified by name
 * @abstract
 * @extends {GameEvent}
 * @classdesc Named event that is identified by name
 */
export abstract class NamedEvent extends GameEvent {
    /**
     * Identified name
     * @protected
     * @type {string}
     */
    name: string;

    /**
     * Named event constructor
     * @constructor
     * @param {string} name Identified name
     */
    constructor(name: string) {
        super();

        /**
         * Identified name
         * @protected
         * @type {string}
         */
        this.name = name;
    }

    /**
     * Get event's identified name
     * @return {string} Identified name
     */
    getName(): string {
        return this.name;
    }
}
