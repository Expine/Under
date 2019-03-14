/**
 * Event camera
 * - Calculates the area to rendering
 * - Delegates some processing to another camera
 * - ### For using by event
 * @extends {DelegateCamera}
 * @classdesc Event camera to use by event
 */
class EventCamera extends DelegateCamera {
    /**
     * Event camera constructor
     * @constructor
     * @param {Camera} baseCamera Base camera for delegation
     */
    constructor(baseCamera) {
        super(baseCamera);

        /**
         * Movement x position
         * @protected
         * @type {number}
         */
        this.toX = 0;
        /**
         * Movement y position
         * @protected
         * @type {number}
         */
        this.toY = 0;
    }

    /**
     * Set movement position
     * @param {number} x Movement x position
     * @param {number} y Movement y position
     */
    setToPosition(x, y) {
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
    update(x, y, dt) {
        super.update(this.toX, this.toY, dt);
        this.cameraX = this.baseCamera.cameraX;
        this.cameraY = this.baseCamera.cameraY;
    }
}
