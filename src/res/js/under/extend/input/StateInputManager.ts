import { IInput } from './../../base/input/IInput';
import { Input } from "../../base/input/Input";
import { GameScreen } from '../../base/screen/GameScreen';

/**
 * Input state
 * @protected
 * @const
 * @enum {Enum<number>}
 */
export enum STATE {
    NONE = 0,
    PRESS = 1,
    PRESSED = 2,
    ON = 3,
};

/**
 * State input manager
 * - Registers input state by input event
 * @extends {Input}
 * @implements {IInput}
 * @classdesc State input manager to regiter input state by input event
 */
export class StateInputManager extends Input implements IInput {
    /**
     * Array for registering input state
     * @protected
     * @type {Array<number>}
     */
    protected inputState: Array<number>;

    /**
     * Whether input is blocked or not
     * @protected
     * @type {Array<boolean>}
     */
    protected blocked: Array<boolean>;

    /**
     * Input target
     * For example, div, document
     * @protected
     * @type {HTMLElement}
     */
    protected target: HTMLElement;

    /**
     * Enable for input
     * @protected
     * @type {boolean}
     */
    protected enable: boolean;

    /**
     * State input manager constructor
     * @constructor
     * @param {GameScreen} screen Screen to input
     */
    constructor(screen: GameScreen) {
        super(screen);

        this.inputState = [];
        this.blocked = [];
        this.target = this.screen.getTarget();
        this.enable = true;
    }

    /**
     * Initialize input
     * @override
     */
    init() {
    }

    /**
     * Update input state
     * @override
     */
    update() {
        // update input state
        for (let i = 0; i < this.inputState.length; ++i) {
            switch (this.inputState[i]) {
                case STATE.PRESS:
                    this.inputState[i] = STATE.PRESSED;
                    break;
                case STATE.PRESSED:
                    this.inputState[i] = STATE.ON;
                    break;
            }
            this.blocked[i] = false;
        }
    }

    /**
     * Clear input state
     * @override
     */
    clear() {
        for (let i = 0; i < this.inputState.length; ++i) {
            this.inputState[i] = STATE.NONE;
        }
    }

    /**
     * Set inpt enable
     * @override
     * @param {boolean} enable Input enable
     */
    setInputEnable(enable: boolean) {
        this.enable = enable;
        this.clear();
    }

    /**
     * Block input
     * @iverride
     * @param {number} code Target code
     */
    blockInput(code: number) {
        this.blocked[code] = true;
    }

    /**
     * Unblock input
     * @override
     * @param {number} code Target code
     */
    unblockInput(code: number) {
        this.blocked[code] = false;
    }

    /**
     * Press target code
     * @override
     * @param {number} code Target code
     */
    press(code: number) {
        this.inputState[code] = STATE.PRESSED;
    }

    /**
     * Unpress target code
     * @override
     * @param {number} code Target code
     */
    unpress(code: number) {
        this.inputState[code] = STATE.NONE;
    }

    /**
     * Judge whether pressed now
     * @override
     * @param {number} code Target code
     * @return {boolean} whether pressed now
     */
    isPress(code: number): boolean {
        return !this.blocked[code] && this.inputState[code] !== undefined && this.inputState[code] === STATE.PRESSED;
    }

    /**
     * Judge whether pressed
     * @override
     * @param {number} code Target code
     * @return {boolean} whether pressed
     */
    isPressed(code: number): boolean {
        return !this.blocked[code] && this.inputState[code] !== undefined && (this.inputState[code] === STATE.PRESSED || this.inputState[code] === STATE.ON);
    }
}
