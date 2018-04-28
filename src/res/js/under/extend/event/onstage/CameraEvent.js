/**
 * Camera event
 * - Updates and renders event
 * - Controls the stage
 * - ### Moves camera
 * @classdesc Camera event to move camera
 */
class CameraEvent extends GameEvent /* , IStageEvent */ { // eslint-disable-line  no-unused-vars
    /**
     * Camera event constructor
     * @constructor
     * @param {string} name Camera unique name
     * @param {number} x Camera x position to move
     * @param {number} y Camera y position to move
     */
    constructor(name, x, y) {
        super();

        /**
         * Camera unique name
         * @protected
         * @type {string}
         */
        this.name = name;
        /**
         * Camera x position to move
         * @protected
         * @type {number}
         */
        this.toX = x;
        /**
         * Camera y position to move
         * @protected
         * @type {number}
         */
        this.toY = y;

        /**
         * Stage for constrol
         * @protected
         * @type {Stage}
         */
        this.stage = null;

        // TODO: Shoud be abstracted
        /**
         * Event camera
         * @protected
         * @type {EventCamera}
         */
        this.camera = null;
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
        this.camera = new EventCamera();
        this.camera.setToPosition(this.toX, this.toY);
        this.camera.setDelegate(this.stage.getCamera());
        this.stage.setCamera(this.camera);
        this.op.stopRender(this);
        this.op.next();
    }

    /**
     * Destructor of event
     * @override
     */
    destruct() {
        this.stage.setCamera(this.camera.getDelegate());
    }

    // TODO: Should be abstracted
    /**
     * Get event's unique name
     * @return {string} Unique name of event (return null if it is unnecessary)
     */
    getName() {
        return this.name;
    }
}
