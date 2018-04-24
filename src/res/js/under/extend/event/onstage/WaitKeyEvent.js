/**
 * Wait key event
 * - Updates and renders event
 * - Controls the stage
 * - ### Waits to input key
 * @classdesc Wait key event to wait to input key
 */
class WaitKeyEvent extends GameEvent /* , IStageEvent */ { // eslint-disable-line  no-unused-vars
    /**
     * Wait key event constructor
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
     */
    update(dt) {
        if (Input.it.isPress(Input.key.yes())) {
            this.op.stopUpdate(this);
            this.op.stopRender(this);
            this.op.next();
        }
    }
}
