/**
 * Transitional event
 * - Updates and renders event
 * - Controls the stage
 * - Stores stage instance
 * - ### Transitions the stage
 * @classdesc Transitional event to transition the stage
 */
class TransitionalEvent extends StageEvent { // eslint-disable-line  no-unused-vars
    /**
     * Transitional event constructor
     * @constructor
     * @param {string} stageName Stage name
     * @param {boolean} isReplace Whether scene is replaced or not
     */
    constructor(stageName, isReplace) {
        super();

        /**
         * Stage name
         * @protected
         * @type {string}
         */
        this.stageName = stageName;
        /**
         * Whether scene is replaced or not
         * @protected
         * @type {boolean}
         */
        this.isReplace = isReplace;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        if (this.isReplace) {
            StageManager.it.replaceStage(this.stageName);
        } else {
            StageManager.it.pushStage(this.stageName);
        }
        this.op.stopUpdate(this);
        this.op.stopRender(this);
        this.op.next();
    }
}
