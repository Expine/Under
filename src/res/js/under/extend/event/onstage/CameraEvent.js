/**
 * Camera event
 * - Updates and renders event
 * - Identified by name
 * - Controls the stage
 * - ### Moves camera
 * @extends {NamedEvent}
 * @implements {IStageEvent}
 * @classdesc Camera event to move camera
 */
class CameraEvent extends NamedEvent /* , IStageEvent */ { // eslint-disable-line  no-unused-vars
    /**
     * Camera event constructor
     * @constructor
     * @param {string} name Identified name
     * @param {number} x Camera x position to move
     * @param {number} y Camera y position to move
     */
    constructor(name, x, y) {
        super(name);

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
         * Event camera
         * @protected
         * @type {DelegateCamera}
         */
        this.camera = null;

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
        this.camera = new EventCamera(this.stage.getCamera());
        this.camera.setToPosition(this.toX, this.toY);
        this.camera.setScreenSize(this.stage.getCamera().screenWidth, this.stage.getCamera().screenHeight);
        this.stage.setCamera(this.camera);
        this.op.next();
    }

    /**
     * Destructor of event
     * @override
     */
    destruct() {
        this.stage.setCamera(this.camera.getBaseCamera());
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
