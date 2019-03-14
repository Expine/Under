/**
 * Game Screen
 * - Indicates the rendering target and input target
 * @abstract
 * @classdesc Game Screen indicating the rendering and input target
 */
export abstract class GameScreen {
    /**
     * Instance for singleton
     * @static
     * @type {GameScreen}
     */
    static it: GameScreen;

    /**
     * Game screen ratio
     * @type {number}
     */
    gameSize: number;
    /**
     * Width of game screen size
     * @type {number}
     */
    width: number;
    /**
     * Height of game screen size
     * @type {number}
     */
    height: number;

    /**
     * Game Screen constructor
     * @constructor
     * @param {number} width Screen width
     * @param {number} height Screen height
     */
    constructor(width: number, height: number) {
        this.gameSize = 1;
        this.width = width;
        this.height = height;

        // set singleton
        GameScreen.it = this;
    }

    /**
     * Initialize screen
     * @abstract
     */
    abstract init(): void;

    /**
     * Get input target element
     * @abstract
     * @return {HTMLElement} Element of input target
     */
    abstract getTarget(): HTMLElement;

    /**
     * Get canvas for rendering
     * @abstract
     * @return {HTMLCanvasElement} Canvas
     */
    abstract getCanvas(): HTMLCanvasElement;
}

