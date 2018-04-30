/**
 * Stage stop event
 * - Updates and renders event
 * - Controls the stage
 * - Stores stage instance
 * - ### Stops stage
 * @classdesc Stage stop event to stop stage
 */
class StageStopEvent extends StageEvent { // eslint-disable-line  no-unused-vars
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
