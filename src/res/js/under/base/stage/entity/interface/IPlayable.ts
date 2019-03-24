import { IPlayable } from './IPlayable';
/**
 * Playable interface
 * - Player function interface
 * @interface
 * @classdesc Playable interface for player function
 */
export interface IPlayable {
    /**
     * Get x position for camera
     * @abstract
     * @return {number} X position for camera
     */
    getCameraX(): number;

    /**
     * Get y position for camera
     * @abstract
     * @return {number} y position for camera
     */
    getCameraY(): number;

    /**
     * Judge whether game over or not
     * @abstract
     * @return {boolean} whether game over or not
     */
    isGameover(): boolean;
}

/**
 * Type guard for IPlayable
 */
export const isIPlayable = (arg: any): arg is IPlayable => arg !== null && arg.isGameover !== undefined;
