import { Entity } from "../../../../under/base/stage/entity/Entity";

/**
 * Hook interface
 * - It can get hook position and change state
 * @interface
 * @classdesc Hook interface that can get hook position and change state
 */
export interface IHook {
    /**
     * Get actor who it belongs to
     * @abstract
     * @return {Entity} Actor who it belongs to
     */
    getActor(): Entity | null;

    /**
     * Create post hook (Do not create it if it already exists)
     * @abstract
     */
    createPost(): void;

    /**
     * Hooked hook
     * @abstract
     */
    hooked(): void;

    /**
     * Release hook
     * @abstract
     */
    release(): void;

    /**
     * Try to remove it
     * @abstract
     * @return {boolean} Whether it was removed
     */
    tryRemove(): boolean;

    /**
     * Whether the tip of the hook
     * @abstract
     * @return {boolean} Whether the tip of the hook
     */
    isHead(): boolean;
}

/**
 * Type guard for IHook
 */
export const isIHook = (arg: any): arg is IHook => arg !== null && arg.isHead !== undefined;
