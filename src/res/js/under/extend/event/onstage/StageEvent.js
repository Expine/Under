/**
 * Stage event
 * - Updates and renders event
 * - Controls the stage
 * - ### Stores stage instance
 * @classdesc Stage event to store stage instance
 */
class StageEvent extends GameEvent /* , IStageEvent */ { // eslint-disable-line  no-unused-vars
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
     * @param {Stage} stage Stage to set
     */
    setStage(stage) {
        this.stage = stage;
    }
}
