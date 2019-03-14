import { GameScreen } from "../../base/screen/GameScreen";

/**
 * Delegate screen
 * - Delegates the process to the destination
 * @abstract
 * @extends {GameScreen}
 * @classdesc Delegate screen to delegate the process to the destination
 */
export abstract class DelegateScreen extends GameScreen {
    /**
     * Original screen
     * @protected
     * @type {GameScreen}
     */
    protected delegate: GameScreen;

    /**
    * Delegate screen constructor
    * @constructor
    * @param {GameScreen} delegate Original screen
    */
    constructor(delegate: GameScreen) {
        super(delegate.width, delegate.height);

        this.delegate = delegate;
    }

    /**
     * Initialize screen
     * @override
     */
    init() {
        this.delegate.init();
    }

    /**
     * Get input target element
     * @override
     * @return {HTMLElement} Element of input target
     */
    getTarget(): HTMLElement {
        return this.delegate.getTarget();
    }

    /**
     * Get canvas for rendering
     * @override
     * @return {HTMLCanvasElement} Canvas
     */
    getCanvas(): HTMLCanvasElement {
        return this.delegate.getCanvas();
    }
}
