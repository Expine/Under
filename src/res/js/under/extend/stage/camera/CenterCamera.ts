import { Camera } from "../../../base/stage/camera/Camera";

/**
 * Center camera
 * - Centering at the indicated coordinates
 * @extends {Camera}
 * @classdesc Center camera for centering at the indicated coodinates
 */
export class CenterCamera extends Camera {
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
    update(x: number, y: number, _dt: number) {
        this.cameraX = this.screenWidth / 2 - x;
        this.cameraY = this.screenHeight / 2 - y;
    }
}
