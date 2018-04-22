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
     * @param {Stage} stage Stage for control
     */
    constructor(stage) {
        super();

        /**
         * Stage for control
         * @protected
         * @type {Stage}
         */
        this.stage = stage;
    }
}
