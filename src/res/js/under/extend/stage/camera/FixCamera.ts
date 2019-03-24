import { Camera } from "../../../base/stage/camera/Camera";

/**
 * Fix camera
 * - Fixes certain position
 * @extends {Camera}
 * @classdesc Fix camera to fix certain position
 */
export class FixCamera extends Camera {
    /**
     * Fixed x position
     * @protected
     * @type {number}
     */
    protected fixX: number;
    /**
     * Fixed y position
     * @protected
     * @type {number}
     */
    protected fixY: number;

    /**
     * Fix camera constructor
     * @constructor
     * @param {number} x Fixed x position
     * @param {number} y Fixed y position
     */
    constructor(x: number, y: number) {
        super();

        this.fixX = x;
        this.fixY = y;
    }

    /**
     * Initialize camera
     * @override
     * @param {number} x First camera x position
     * @param {number} y First camera y position
     */
    init(x: number, y: number) {
        this.update(x, y, 0);
    }

    /**
     * Update camera
     * @override
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} dt Delta time
     */
    update(_x: number, _y: number, _dt: number) {
        this.cameraY = -this.fixX;
        this.cameraY = -this.fixY;
    }
}
