import { Camera } from "./Camera";

/**
 * Delegate camera
 * - Delegates some processing to another camera
 * @abstract
 * @extends {Camera}
 * @classdesc Delegate camera to delegate some processing to another camera
 */
export abstract class DelegateCamera extends Camera {
    /**
     * Base camera for delegation
     * @protected
     * @type {Camera}
     */
    baseCamera: Camera;

    /**
     * Delegate camera constructor
     * @constructor
     * @param {Camera} baseCamera Base camera for delegation
     */
    constructor(baseCamera: Camera) {
        super();
        this.baseCamera = baseCamera;
    }

    /**
     * Get delegation base camera
     * @return {Camera} Delegation camera
     */
    getBaseCamera(): Camera {
        return this.baseCamera;
    }

    /**
     * Set screen size
     * @override
     * @param {number} screenWidth Camera screen width
     * @param {number} screenHeight Camera screen height
     */
    setScreenSize(screenWidth: number, screenHeight: number) {
        super.setScreenSize(screenWidth, screenHeight);
        this.baseCamera.setScreenSize(screenWidth, screenHeight);
    }

    /**
     * Set camera max size
     * @override
     * @param {number} maxWidth Camera max width
     * @param {number} maxHeight Cmera max height
     */
    setMaxSize(maxWidth: number, maxHeight: number) {
        super.setMaxSize(maxWidth, maxHeight);
        this.baseCamera.setMaxSize(maxWidth, maxHeight);
    }

    /**
     * Initialize camera
     * @override
     * @param {number} x First camera x position
     * @param {number} y First camera y position
     */
    init(x: number, y: number) {
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
    update(x: number, y: number, dt: number) {
        this.baseCamera.update(x, y, dt);
    }
}
