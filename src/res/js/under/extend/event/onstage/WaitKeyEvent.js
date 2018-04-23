/**
 * Wait key event
 * - Updates and renders event
 * - Controls the stage
 * - ### Waits to input key
 * @classdesc Wait key event to wait to input key
 */
class WaitKeyEvent extends StageEvent { // eslint-disable-line  no-unused-vars
    /**
     * Initialize event
     * @override
     */
    init() {
        this.stage.setEnable(false);
    }

    /**
     * Update event
     * @override
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
