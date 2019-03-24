import { SequentialEvent } from './../common/SequentialEvent';
import { IStageEvent, isIStageEvent } from './../../../base/event/onstage/IStageEvent';
import { Stage } from '../../../base/stage/Stage';
/**
 * Seuqential stage event
 * - Controls the stage
 * - It can set stage element
 * @extends {SequentialEvent}
 * @implements {IStageEvent}
 * @classdesc Seuqential stage event to control stage
 */
export class SequentialStageEvent extends SequentialEvent implements IStageEvent {
    /**
     * Stage for constrol
     * @protected
     * @type {Stage}
     */
    protected stage: Stage | null;

    /**
     * Seuqential stage event constructor
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
     * @param {Stage} stage Stage to set
     */
    setStage(stage: Stage) {
        this.stage = stage;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        if (this.stage !== null) {
            for (const it of this.events) {
                if (isIStageEvent(it)) {
                    it.setStage(this.stage);
                }
            }
        }
        super.init();
    }
}
