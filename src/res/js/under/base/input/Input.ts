import { IMouse, isIMouse } from './IMouse';
import { IKey, isIKey } from './IKey';
import { GameScreen } from '../screen/GameScreen';
/**
 * Input
 * - Manages input event
 * @abstract
 * @classdesc Input to manage input event
 */
export abstract class Input {
    /**
     * Key input instance
     * @static
     * @type {IKey}
     */
    static key: IKey;
    /**
     * Mouse input instance
     * @static
     * @type {IMouse}
     */
    static mouse: IMouse;

    /**
     * Screen instance for getting screen ratio
     * @protected
     * @type {GameScreen}
     */
    protected screen: GameScreen;

    /**
     * Input constructor
     * @constructor
     * @param {GameScreen} screen Screen to input
     */
    constructor(screen: GameScreen) {
        this.screen = screen;
        if (isIKey(this)) {
            Input.key = this;
        }
        if (isIMouse(this)) {
            Input.mouse = this;
        }
    }

    /**
     * Initialize input
     * @abstract
     */
    abstract init(): void;

    /**
     * Update input
     * @abstract
     */
    abstract update(): void;
}
