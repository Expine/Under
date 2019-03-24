import { MultiAnimation } from "./MultiAnimation";

/**
 * Named animation
 * - Manages animation by name
 * @interface
 * @extends {MultiAnimation}
 * @classdesc Named animation to manage animation by name
 */
export abstract class NamedAnimation extends MultiAnimation {
    /**
     * Set animation name
     * @abstract
     * @param {string} name Animation name
     */
    abstract setName(name: string): void;
}
