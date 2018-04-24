/**
 * Stage restore event
 * - Updates and renders event
 * - Controls the stage
 * - ### Restores stage
 * @classdesc Stage restore event to restore stage
 */
class StageRestoreEvent extends GameEvent /* , IStageEvent */ { // eslint-disable-line  no-unused-vars
    /**
     * Stage restore event constructor
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
        this.stage.setEnable(true);
        this.op.stopUpdate(this);
        this.op.stopRender(this);
        this.op.next();
    }
}
