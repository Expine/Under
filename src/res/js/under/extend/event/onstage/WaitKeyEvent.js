/**
 * Stage event
 * - Updates and renders event
 * - Controls the stage
 * - ### Waits to input key
 * @classdesc Stage event to wait to input key
 */
class WaitKeyEvent extends StageEvent { // eslint-disable-line  no-unused-vars
    /**
     * Initialize event
     * @interface
     */
    init() {
        this.stage.setEnable(false);
    }

    /**
     * Update event
     * @interface
     * @param {number} dt Delta time
     */
    update(dt) {
        if (Input.it.isPress(Input.key.yes())) {
            this.stage.setEnable(true);
            this.op.stopUpdate(this);
            this.op.stopRender(this);
            this.op.next();
        }
    }
}
