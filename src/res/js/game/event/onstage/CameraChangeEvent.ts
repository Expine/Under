import { StageEvent } from "../../../under/base/event/onstage/StageEvent";
import { CenterCamera } from "../../../under/extend/stage/camera/CenterCamera";
import { ClipCamera } from "../../../under/extend/stage/camera/ClipCamera";
import { MovingCamera } from "../../../under/extend/stage/camera/MovingCamera";
import { Context } from "../../../under/base/resources/image/Context";

/**
 * Camera change event
 * - Changes camera type
 * @extends {StageEvent}
 * @classdesc Camera change event to change camera type
 */
export class CameraChangeEvent extends StageEvent {
    /**
     * Camera type
     * @protected
     * @type {string}
     */
    protected type: string;
    /**
     * Whehter camera can move or not
     * @protected
     * @type {boolean}
     */
    protected isMoving: boolean;
    /**
     * Whehter camera can clip or not
     * @protected
     * @type {boolean}
     */
    protected isCliping: boolean;
    /**
     * Camera change event constructor
     * @constructor
     * @param {string} type Camera type
     * @param {boolean} [isMoving=false] Whehter camera can move or not
     * @param {boolean} [isCliping=false] Whehter camera can clip or not
     */
    constructor(type: string, isMoving: boolean = false, isCliping: boolean = false) {
        super();

        this.type = type;
        this.isMoving = isMoving;
        this.isCliping = isCliping;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        let camera = null;
        if (this.type === `center`) {
            camera = new CenterCamera();
        }
        if (this.isCliping && camera !== null) {
            camera = new ClipCamera(camera);
        }
        if (this.isMoving && camera !== null) {
            camera = new MovingCamera(camera);
        }
        if (this.stage !== null && camera !== null) {
            const old = this.stage.getCamera();
            if (old !== null) {
                camera.setScreenSize(old.screenWidth, old.screenHeight);
                camera.setMaxSize(old.maxWidth, old.maxHeight);
            }
            this.stage.setCamera(camera);
        }
        if (this.op !== null) {
            this.op.next();
        }
    }

    /**
     * Destructor of event
     * @override
     */
    destruct() { }

    /**
     * Update event
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether update is endped or not
     */
    update(_dt: number): boolean { return true; }

    /**
     * Render event
     * @override
     * @param {Context} ctx Canvas context
     */
    render(_ctx: Context) { }
}
