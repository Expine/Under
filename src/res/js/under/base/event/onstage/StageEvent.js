/**
 * Stage event
 * - Updates and renders event
 * - Controls the stage
 * - ### Stores stage instance
 * @extends {GameEvent}
 * @implements {IStageEvent}
 * @classdesc Stage event to store stage instance
 */
class StageEvent extends GameEvent /* , IStageEvent */ {
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
    setStage(stage) {
        this.stage = stage;
    }
}
