/**
 * Event camera
 * - Calculates the area to rendering
 * - ### For using by event
 * @extends {Camera}
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
     * Set camera max size
     * @override
     * @param {number} maxWidth Camera max width
     * @param {number} maxHeight Cmera max height
     */
    setMaxSize(maxWidth, maxHeight) {
        super.setMaxSize(maxWidth, maxHeight);
        this.delegate.setMaxSize(maxWidth, maxHeight);
    }

    /**
     * Initialize camera
     * @override
     * @param {number} x First camera x position
     * @param {number} y First camera y position
     */
    init(x, y) {
        this.baseCamera.init(x, y);
        this.cameraX = this.delegate.cameraX;
        this.cameraY = this.delegate.cameraY;
    }

    /**
     * Update camera
     * @override
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} dt Delta time
     */
    update(x, y, dt) {
        this.delegate.update(this.toX, this.toY, dt);
        this.cameraX = this.delegate.cameraX;
        this.cameraY = this.delegate.cameraY;
    }
}
