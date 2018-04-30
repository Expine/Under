/**
 * Camera change event
 * - Updates and renders event
 * - Controls the stage
 * - Stores stage instance
 * - ### Changes camera type
 * @classdesc Camera change event to change camera type
 */
class CameraChangeEvent extends StageEvent { // eslint-disable-line  no-unused-vars
    /**
     * Camera change event constructor
     * @constructor
     * @param {string} type Camera type
     * @param {boolean} [isMoving=false] Whehter camera can move or not
     * @param {boolean} [isCliping=false] Whehter camera can clip or not
     */
    constructor(type, isMoving = false, isCliping = false) {
        super();

        /**
         * Camera type
         * @protected
         * @type {string}
         */
        this.type = type;
        /**
         * Whehter camera can move or not
         * @protected
         * @type {boolean}
         */
        this.isMoving = isMoving;
        /**
         * Whehter camera can clip or not
         * @protected
         * @type {boolean}
         */
        this.isCliping = isCliping;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        let old = this.stage.getCamera();
        let camera = null;
        if (this.type == `center`) {
            camera = new CenterCamera();
        }
        if (this.isCliping) {
            camera = new ClipCamera(camera);
        }
        if (this.isMoving) {
            camera = new MovingCamera(camera);
        }
        camera.setScreenSize(old.screenWidth, old.screenHeight);
        this.stage.setCamera(camera);
        this.op.stopUpdate(this);
        this.op.stopRender(this);
        this.op.next();
    }
}
