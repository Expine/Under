/**
 * Physical change event
 * - Updates and renders event
 * - Controls the stage
 * - Stores stage instance
 * - ### Changes physical type
 * @classdesc Physical change event to change physical type
 */
class PhysicalChangeEvent extends StageEvent { // eslint-disable-line  no-unused-vars
    /**
     * Physical change event constructor
     * @constructor
     * @param {CollisionResponse} response Response for collision
     */
    constructor(response) {
        super();

        /**
         * Response for collision
         * @protected
         * @type {CollisionResponse}
         */
        this.response = response;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        this.stage.getPhysicalWorld().setResponse(this.response);
        this.op.stopUpdate(this);
        this.op.stopRender(this);
        this.op.next();
    }
}
