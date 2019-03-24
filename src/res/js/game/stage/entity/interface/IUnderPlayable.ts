import { IPlayable } from "../../../../under/base/stage/entity/interface/IPlayable";

/**
 * Under playable interface
 * - Under player function interface
 * @interface
 * @implements {IPlayable}
 * @classdesc Under playable interface for under player function
 */
export interface IUnderPlayable extends IPlayable {
    /**
     * Change working AI
     * @abstract
     * @param {number} id Terrain ID for changing player type
     * @return {boolean} Whther player is changed or not
     */
    changeType(id: number): boolean;
}

/**
 * Type guard for IUnderPlayable
 */
export const isIUnderPlayable = (arg: any): arg is IUnderPlayable => arg !== null && arg.changeType !== undefined;
