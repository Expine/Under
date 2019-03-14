/**
 * Seuqential stage event
 * - Updates and renders event
 * - Controls event
 * - Executes events continuously
 * - ### Controls the stage
 * - ### It can set stage element
 * @extends {SequentialEvent}
 * @implements {IStageEvent}
 * @classdesc Seuqential stage event to control stage
 */
class SequentialStageEvent extends SequentialEvent /* IStageEvent */ {
    /**
     * Seuqential stage event constructor
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
        for (const it of this.events) {
            if (BaseUtil.implementsOf(it, IStageEvent)) {
                it.setStage(this.stage);
            }
        }
        super.init();
    }
}
