/**
 * Wait key event
 * - Updates and renders event
 * - Controls the stage
 * - Stores stage instance
 * - ### Waits to input key
 * @extends {StageEvent}
 * @classdesc Wait key event to wait to input key
 */
class WaitKeyEvent extends StageEvent {
    /**
     * Initialize event
     * @override
     */
    init() {
        this.stage.setEnable(false);
    }

    /**
     * Destructor of event
     * @override
     */
    destruct() {
        this.stage.setEnable(true);
    }

    /**
     * Update event
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether update is endped or not
     */
    update(dt) {
        if (Input.key.isPress(Input.key.yes())) {
            this.op.next();
            return true;
        }
        return false;
    }
}
