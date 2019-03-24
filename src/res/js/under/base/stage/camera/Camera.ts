/**
 * Camera
 * - Calculates the area to rendering
 * @abstract
 * @classdesc Camera to calculate the area of rendering
 */
export abstract class Camera {
    /**
     * Camera x position
     * @type {number}
     */
    cameraX: number;
    /**
     * Camera y position
     * @type {number}
     */
    cameraY: number;

    /**
     * Camera base x position
     * @type {number}
     */
    baseX: number;
    /**
     * Camera base y position
     * @type {number}
     */
    baseY: number;
    /**
     * Camera screen width
     * @type {number}
     */
    screenWidth: number;
    /**
     * Camera screen height
     * @type {number}
     */
    screenHeight: number;

    /**
     * Camera max width
     * @protected
     * @type {number}
     */
    maxWidth: number;
    /**
     * Camera max height
     * @protected
     * @type {number}
     */
    maxHeight: number;

    /**
     * Camera Constructor
     * @constructor
     */
    constructor() {
        this.cameraX = 0;
        this.cameraY = 0;

        this.baseX = 0;
        this.baseY = 0;
        this.screenWidth = 0;
        this.screenHeight = 0;

        this.maxWidth = 0;
        this.maxHeight = 0;
    }

    /**
     * Set screen size
     * @param {number} screenWidth Camera screen width
     * @param {number} screenHeight Camera screen height
     */
    setScreenSize(screenWidth: number, screenHeight: number) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
    }

    /**
     * Set camera max size
     * @param {number} maxWidth Camera max width
     * @param {number} maxHeight Cmera max height
     */
    setMaxSize(maxWidth: number, maxHeight: number) {
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
    }

    /**
     * Initialize camera
     * @abstract
     * @param {number} x First camera x position
     * @param {number} y First camera y position
     */
    abstract init(x: number, y: number): void;

    /**
     * Update camera
     * @abstract
     * @param {number} x Base x position
     * @param {number} y Base y position
     * @param {number} dt Delta time
     */
    abstract update(x: number, y: number, dt: number): void;
}
