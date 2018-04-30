/**
 * Camera event
 * - Updates and renders event
 * - Controls the stage
 * - Stores stage instance
 * - ### Moves camera
 * @classdesc Camera event to move camera
 */
class CameraEvent extends StageEvent { // eslint-disable-line  no-unused-vars
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

        // TODO: Shoud be abstracted
        /**
         * Event camera
         * @protected
         * @type {EventCamera}
         */
        this.camera = null;
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
