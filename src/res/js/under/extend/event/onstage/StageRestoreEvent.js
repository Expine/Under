/**
 * Stage restore event
 * - Updates and renders event
 * - Controls the stage
 * - Stores stage instance
 * - ### Restores stage
 * @classdesc Stage restore event to restore stage
 */
class StageRestoreEvent extends StageEvent { // eslint-disable-line  no-unused-vars
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
