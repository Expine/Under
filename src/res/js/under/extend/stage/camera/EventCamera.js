/**
 * Event camera
 * - Calculates the area to rendering
 * - ### For using by event
 * @implements {Camera}
 * @classdesc Event camera to use by event
 */
class EventCamera extends Camera { // eslint-disable-line  no-unused-vars
    /**
     * Event camera constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Delegation camera
         * @protected
         * @type {Camera}
         */
        this.delegate = null;

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
     * Set delegation camera
     * @param {Camera} camera Delegation camera
     */
    setDelegate(camera) {
        this.delegate = camera;
    }

    /**
     * Get delegation camera
     * @return {Camera} Delegation camera
     */
    getDelegate() {
        return this.delegate;
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
     * @param {number} dt Delta time
     */
    update(dt) {
        this.delegate.update(dt);
    }

    /**
     * Set camera position
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} width Camera max width
     * @param {number} height Camera max height
     */
    setCameraPosition(x, y, width, height) {
        this.delegate.setCameraPosition(this.toX, this.toY, width, height);
        this.cameraX = this.delegate.cameraX;
        this.cameraY = this.delegate.cameraY;
        this.screenWidth = this.delegate.screenWidth;
        this.screenHeight = this.delegate.screenHeight;
    }
}
