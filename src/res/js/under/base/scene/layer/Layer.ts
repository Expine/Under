import { Context } from "../../resources/image/Context";

/**
 * Layer
 * - Performs drawing processing collectively
 * @abstract
 * @classdesc Layer to perform drawing processing collectively
 */
export abstract class Layer {
    /**
     * Layer x position
     * @type {number}
     */
    x: number = 0;
    /**
     * Layer y position
     * @type {number}
     */
    y: number = 0;
    /**
     * Layer z position
     * @type {number}
     */
    z: number = 0;

    /**
     * Layer width
     * @protected
     * @type {number}
     */
    width: number = 0;
    /**
     * Layer height
     * @protected
     * @type {number}
     */
    height: number = 0;

    /**
     * Layer constructor
     * @constructor
     */
    constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 0;

        this.width = 0;
        this.height = 0;
    }

    /**
     * Set layer position
     * @param {number} x Layer x position
     * @param {number} y Layer y position
     * @param {number} z Layer z position
     */
    setPosition(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * Set layer size
     * @param {number} width Layer width
     * @param {number} height Layer height
     */
    setSize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    /**
     * Initialize scene
     * @abstract
     */
    abstract init(): void;

    /**
     * Update layer
     * @abstract
     * @param {number} dt Delta time
     */
    abstract update(dt: number): void;

    /**
     * Render layer
     * @abstract
     * @param {Context} ctx Canvas context
     */
    abstract render(ctx: Context): void;
}
