import { IStageEvent } from './IStageEvent';
import { Stage } from "../../stage/Stage";

/**
 * Stage event interface
 * - Controls the stage
 * @interface
 * @classdesc Stage event interface to control the stage
 */
export interface IStageEvent {
    /**
     * Set stage
     * @abstract
     * @param {Stage} stage Stage to set
     */
    setStage(stage: Stage): void;
}

/**
 * Type guard for IStageEvent
 */
export const isIStageEvent = (arg: any): arg is IStageEvent => arg !== null && arg.setStage !== undefined;
