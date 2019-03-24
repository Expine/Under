import { NamedEvent } from "../../../base/event/common/NamedEvent";
import { DelegateCamera } from "../../../base/stage/camera/DelegateCamera";
import { Stage } from "../../../base/stage/Stage";
import { IStageEvent } from "../../../base/event/onstage/IStageEvent";
import { Context } from "../../../base/resources/image/Context";
import { EventCamera } from "../../stage/camera/EventCamera";

/**
 * Camera event
 * - Moves camera
 * @extends {NamedEvent}
 * @implements {IStageEvent}
 * @classdesc Camera event to move camera
 */
export class CameraEvent extends NamedEvent implements IStageEvent {
    /**
     * Camera x position to move
     * @protected
     * @type {number}
     */
    protected toX: number;
    /**
     * Camera y position to move
     * @protected
     * @type {number}
     */
    protected toY: number;

    /**
     * Event camera
     * @protected
     * @type {DelegateCamera}
     */
    protected camera: DelegateCamera | null;

    /**
     * Stage for constrol
     * @protected
     * @type {Stage}
     */
    protected stage: Stage | null;

    /**
     * Camera event constructor
     * @constructor
     * @param {string} name Identified name
     * @param {number} x Camera x position to move
     * @param {number} y Camera y position to move
     */
    constructor(name: string, x: number, y: number) {
        super(name);

        this.toX = x;
        this.toY = y;
        this.camera = null;
        this.stage = null;
    }

    /**
     * Set stage
     * @override
     * @param {Stage} stage Stage to set
     */
    setStage(stage: Stage) {
        this.stage = stage;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        if (this.stage !== null) {
            const stageCamera = this.stage.getCamera();
            if (stageCamera !== null) {
                const eventCamera = new EventCamera(stageCamera);;
                eventCamera.setToPosition(this.toX, this.toY);
                eventCamera.setScreenSize(stageCamera.screenWidth, stageCamera.screenHeight);
                this.stage.setCamera(eventCamera);
                this.camera = eventCamera;
            }
        }
        if (this.op !== null) {
            this.op.next();
        }
    }

    /**
     * Destructor of event
     * @override
     */
    destruct() {
        if (this.stage !== null && this.camera !== null) {
            this.stage.setCamera(this.camera.getBaseCamera());
        }
    }

    /**
     * Update event
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether update is endped or not
     */
    update(_dt: number): boolean {
        return false;
    }

    /**
     * Render event
     * @override
     * @param {Context} ctx Canvas context
     */
    render(_ctx: Context) { }
}
