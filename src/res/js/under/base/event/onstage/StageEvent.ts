import { GameEvent } from "../common/GameEvent";
import { IStageEvent } from "./IStageEvent";
import { Stage } from "../../stage/Stage";

/**
 * Stage event
 * - Stores stage instance
 * @abstract
 * @extends {GameEvent}
 * @implements {IStageEvent}
 * @classdesc Stage event to store stage instance
 */
export abstract class StageEvent extends GameEvent implements IStageEvent {
    /**
     * Stage for constrol
     * @protected
     * @type {Stage}
     */
    protected stage: Stage | null;

    /**
     * Stage event constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Stage for constrol
         * @protected
         * @type {Stage}
         */
        this.stage = null;
    }

    /**
     * Set stage
     * @override
     * @param {Stage} stage Stage to set
     */
    setStage(stage: Stage) {
        this.stage = stage;
    }
}
