import { GameScreen } from "../../base/screen/GameScreen";

/**
 * Canvas screen
 * - Both input and rendering target is canvas
 * @abstract
 * @extends {GameScreen}
 * @classdesc Canvas screen that both input and rendering target is canvas
 */
export abstract class CanvasScreen extends GameScreen {
    /**
     * Game canvas
     * @protected
     * @type {HTMLCanvasElement}
     */
    protected abstract canvas: HTMLCanvasElement;

    /**
     * Canvas screen constructor
     * @constructor
     * @param {number} [width = 800] Screen width
     * @param {number} [height = 600] Screen height
     */
    constructor(width: number = 800, height: number = 600) {
        super(width, height);
    }

    /**
     * Get input target element
     * @override
     * @return {HTMLElement} Element of input target
     */
    getTarget(): HTMLElement {
        return this.canvas;
    }

    /**
     * Get canvas for rendering
     * @override
     * @return {HTMLCanvasElement} Canvas
     */
    getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }
}
