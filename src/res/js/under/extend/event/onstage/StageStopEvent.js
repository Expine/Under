/**
 * Stage stop event
 * - Updates and renders event
 * - Controls the stage
 * - ### Stops stage
 * @classdesc Stage stop event to stop stage
 */
class StageStopEvent extends GameEvent /* , IStageEvent */ { // eslint-disable-line  no-unused-vars
    /**
     * Stage stop event constructor
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

    /**
     * Initialize event
     * @override
     */
    init() {
        this.stage.setEnable(false);
        this.op.stopUpdate(this);
        this.op.stopRender(this);
        this.op.next();
    }
}
