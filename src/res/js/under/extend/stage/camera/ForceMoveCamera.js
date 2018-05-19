/**
 * Moving center camera
 * - Calculates the area to rendering
 * - Delegates some processing to another camera
 * - ### Forces to move camera
 * @extends {DelegateCamera}
 * @classdesc Moving center camera to force to move camera
 */
class ForceMoveCamera extends DelegateCamera { // eslint-disable-line  no-unused-vars
    /**
     * Moving Camera Constructor
     * @constructor
     * @param {Camera} baseCamera Base camera for delegation
     * @param {number} x Movement x position
     * @param {number} y Movement y position
     * @param {number} speed Movement speed
     */
    constructor(baseCamera, x, y, speed) {
        super(baseCamera);

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
    }

    /**
     * Initialize camera
     * @override
     * @param {number} x First camera x position
     * @param {number} y First camera y position
     */
    init(x, y) {
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
    update(x, y, dt) {
        super.update(this.nextX, this.nextY, dt);
        this.cameraX = this.baseCamera.cameraX;
        this.cameraY = this.baseCamera.cameraY;

        // update next position
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
}
