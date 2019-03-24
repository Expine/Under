import { DelegateCamera } from "../../../base/stage/camera/DelegateCamera";
import { Camera } from "../../../base/stage/camera/Camera";

/**
 * Moving center camera
 * - Forces to move camera
 * @extends {DelegateCamera}
 * @classdesc Moving center camera to force to move camera
 */
export class ForceMoveCamera extends DelegateCamera {
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
     * Movement speed
     * @protected
     * @type {number}
     */
    protected speed: number;

    /**
     * Next camera x position
     * @protected
     * @type {number}
     */
    protected nextX: number;
    /**
     * Next camera y position
     * @protected
     * @type {number}
     */
    protected nextY: number;

    /**
     * Moving Camera Constructor
     * @constructor
     * @param {Camera} baseCamera Base camera for delegation
     * @param {number} x Movement x position
     * @param {number} y Movement y position
     * @param {number} speed Movement speed
     */
    constructor(baseCamera: Camera, x: number, y: number, speed: number) {
        super(baseCamera);

        this.toX = x;
        this.toY = y;
        this.speed = speed;
        this.nextX = 0;
        this.nextY = 0;
    }

    /**
     * Initialize camera
     * @override
     * @param {number} x First camera x position
     * @param {number} y First camera y position
     */
    init(x: number, y: number) {
        super.init(x, y);
        this.nextX = this.cameraY;
        this.nextY = this.cameraX;
    }

    /**
     * Update camera
     * @override
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} dt Delta time
     */
    update(_x: number, _y: number, dt: number) {
        super.update(this.nextX, this.nextY, dt);
        this.cameraX = this.baseCamera.cameraX;
        this.cameraY = this.baseCamera.cameraY;

        // update next position
        const nx = this.nextX;
        const ny = this.nextY;
        if (this.nextX !== this.toX) {
            this.nextX = this.nextX + this.speed * dt / 1000 * Math.sign(this.toX - this.nextX);
        }
        if (Math.sign(this.toX - nx) * Math.sign(this.toX - this.nextX) < 0) {
            this.nextX = this.toX;
        }
        if (this.nextY !== this.toY) {
            this.nextY = this.nextY + this.speed * dt / 1000 * Math.sign(this.toY - this.nextY);
        }
        if (Math.sign(this.toY - ny) * Math.sign(this.toY - this.nextY) < 0) {
            this.nextY = this.toY;
        }
    }
}
