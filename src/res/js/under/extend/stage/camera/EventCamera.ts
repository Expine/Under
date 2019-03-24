import { DelegateCamera } from "../../../base/stage/camera/DelegateCamera";
import { Camera } from "../../../base/stage/camera/Camera";

/**
 * Event camera
 * - For using by event
 * @extends {DelegateCamera}
 * @classdesc Event camera to use by event
 */
export class EventCamera extends DelegateCamera {
    /**
     * Movement x position
     * @protected
     * @type {number}
     */
    protected toX: number;
    /**
     * Movement y position
     * @protected
     * @type {number}
     */
    protected toY: number;

    /**
      * Event camera constructor
      * @constructor
      * @param {Camera} baseCamera Base camera for delegation
      */
    constructor(baseCamera: Camera) {
        super(baseCamera);

        this.toX = 0;
        this.toY = 0;
    }

    /**
     * Set movement position
     * @param {number} x Movement x position
     * @param {number} y Movement y position
     */
    setToPosition(x: number, y: number) {
        this.toX = x;
        this.toY = y;
    }

    /**
     * Update camera
     * @override
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} dt Delta time
     */
    update(_x: number, _y: number, dt: number) {
        super.update(this.toX, this.toY, dt);
        this.cameraX = this.baseCamera.cameraX;
        this.cameraY = this.baseCamera.cameraY;
    }
}
