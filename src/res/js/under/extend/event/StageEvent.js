/**
 * Stage event
 * - Updates and renders event
 * - ### Controls the stage
 * @classdesc Stage event to control the stage
 */
class StageEvent extends GameEvent { // eslint-disable-line  no-unused-vars
    /**
     * Stage event constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Stage for control
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
