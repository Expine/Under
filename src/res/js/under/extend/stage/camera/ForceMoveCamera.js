/**
 * Moving center camera
 * - Calculates the area to rendering
 * - ### Forces to move camera
 * @extends {ForceMoveCamera}
 * @classdesc Moving center camera to force to move camera
 */
class ForceMoveCamera extends Camera { // eslint-disable-line  no-unused-vars
    /**
     * Moving Camera Constructor
     * @constructor
     * @param {Camera} baseCamera Base camera for delegation
     * @param {number} x Movement x position
     * @param {number} y Movement y position
     * @param {number} speed Movement speed
     */
    constructor(baseCamera, x, y, speed) {
        super();

        /**
         * Base camera for delegation
         * @protected
         * @type {Camera}
         */
        this.baseCamera = baseCamera;

        /**
         * Movement x position
         * @protected
         * @type {number}
         */
        this.toX = x;
        /**
         * Movement y position
         * @protected
         * @type {number}
         */
        this.toY = y;
        /**
         * Movement speed
         * @protected
         * @type {number}
         */
        this.speed = speed;

        /**
         * Next camera x position
         * @protected
         * @type {number}
         */
        this.nextX = 0;
        /**
         * Next camera y position
         * @protected
         * @type {number}
         */
        this.nextY = 0;

        // initialize
        this.cameraX = null;
        this.cameraY = null;
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
     * Update camera
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        // initialize
        if (this.cameraX == null && this.cameraY == null) {
            return;
        }
        let nx = this.nextX;
        let ny = this.nextY;
        if (this.nextX != this.toX) {
            this.nextX = this.nextX + this.speed * dt / 1000 * Math.sign(this.toX - this.nextX);
        }
        if (Math.sign(this.toX - nx) * Math.sign(this.toX - this.nextX) < 0) {
            this.nextX = this.toX;
        }
        if (this.nextY != this.toY) {
            this.nextY = this.nextY + this.speed * dt / 1000 * Math.sign(this.toY - this.nextY);
        }
        if (Math.sign(this.toY - ny) * Math.sign(this.toY - this.nextY) < 0) {
            this.nextY = this.toY;
        }
    }

    /**
     * Set camera position
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} width Camera max width
     * @param {number} height Camera max height
     */
    setCameraPosition(x, y, width, height) {
        // initialize
        if (this.cameraX == null && this.cameraY == null) {
            this.cameraX = x;
            this.cameraY = y;
            this.nextX = x;
            this.nextY = y;
            this.baseCamera.cameraX = x;
            this.baseCamera.cameraY = y;
        }
        this.baseCamera.setCameraPosition(this.nextX, this.nextY, width, height);
        this.cameraX = this.baseCamera.cameraX;
        this.cameraY = this.baseCamera.cameraY;
        this.screenWidth = this.baseCamera.screenWidth;
        this.screenHeight = this.baseCamera.screenHeight;
    }
}
