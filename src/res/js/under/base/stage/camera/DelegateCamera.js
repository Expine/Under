/**
 * Delegate camera
 * - Calculates the area to rendering
 * - ### Delegates some processing to another camera
 * @interface
 * @extends {Camera}
 * @classdesc Delegate camera to delegate some processing to another camera
 */
class DelegateCamera extends Camera { // eslint-disable-line  no-unused-vars
    /**
     * Delegate camera constructor
     * @constructor
     * @param {Camera} baseCamera Base camera for delegation
     */
    constructor(baseCamera) {
        super();

        /**
         * Base camera for delegation
         * @protected
         * @type {Camera}
         */
        this.baseCamera = baseCamera;
    }

    /**
     * Get delegation base camera
     * @return {Camera} Delegation camera
     */
    getBaseCamera() {
        return this.baseCamera;
    }

    /**
     * Set screen size
     * @override
     * @param {number} screenWidth Camera screen width
     * @param {number} screenHeight Camera screen height
     */
    setScreenSize(screenWidth, screenHeight) {
        super.setScreenSize(screenWidth, screenHeight);
        this.baseCamera.setScreenSize(screenWidth, screenHeight);
    }

    /**
     * Set camera max size
     * @override
     * @param {number} maxWidth Camera max width
     * @param {number} maxHeight Cmera max height
     */
    setMaxSize(maxWidth, maxHeight) {
        super.setMaxSize(maxWidth, maxHeight);
        this.baseCamera.setMaxSize(maxWidth, maxHeight);
    }

    /**
     * Initialize camera
     * @override
     * @param {number} x First camera x position
     * @param {number} y First camera y position
     */
    init(x, y) {
        this.baseCamera.init(x, y);
        this.cameraX = this.baseCamera.cameraX;
        this.cameraY = this.baseCamera.cameraY;
    }

    /**
     * Update camera
     * @override
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {
        this.baseCamera.update(x, y, dt);
    }
}
