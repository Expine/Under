import { IStageEvent } from './../../../base/event/onstage/IStageEvent';
import { NamedEvent } from "../../../base/event/common/NamedEvent";
import { Stage } from '../../../base/stage/Stage';
import { Context } from '../../../base/resources/image/Context';

/**
 * Stage stop event
 * - Stops stage
 * @extends {NamedEvent}
 * @implements {IStageEvent}
 * @classdesc Stage stop event to stop stage
 */
export class StageStopEvent extends NamedEvent implements IStageEvent {
    /**
     * Stage for constrol
     * @protected
     * @type {Stage}
     */
    protected stage: Stage | null;

    /**
     * Stage stop event constructor
     * @constructor
     * @param {IEventOperator} op Event operator
     * @param {string} name Identified name
     */
    constructor(name: string) {
        super(name);
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

    /**
     * Initialize event
     * @override
     */
    init() {
        if (this.stage !== null) {
            this.stage.setEnable(false);
        }
        if (this.op !== null) {
            this.op.next();
        }
    }

    /**
     * Destructor of event
     * @override
     */
    destruct() {
        if (this.stage !== null) {
            this.stage.setEnable(true);
        }
    }

    /**
     * Update event
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether update is endped or not
     */
    update(_dt: number): boolean {
        return false;
    }

    /**
     * Render event
     * @override
     * @param {Context} ctx Canvas context
     */
    render(_ctx: Context) { }
}
