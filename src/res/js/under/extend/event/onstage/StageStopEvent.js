/**
 * Stage stop event
 * - Updates and renders event
 * - Identified by name
 * - Controls the stage
 * - ### Stops stage
 * @extends {NamedEvent}
 * @implements {IStageEvent}
 * @classdesc Stage stop event to stop stage
 */
class StageStopEvent extends NamedEvent /* , IStageEvent */ {
    /**
     * Stage stop event constructor
     * @constructor
     * @param {string} name Identified name
     */
    constructor(name) {
        super(name);
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

    /**
     * Initialize event
     * @override
     */
    init() {
        this.stage.setEnable(false);
        this.op.next();
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
        return false;
    }
}
