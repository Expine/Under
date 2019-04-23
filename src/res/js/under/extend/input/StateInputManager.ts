import { IInput } from './../../base/input/IInput';
import { Input } from "../../base/input/Input";

/**
 * Input state
 * @enum {Enum<number>}
 */
export enum STATE {
    NONE = 0,
    PRESS = 1,
    PRESSED = 2,
    ON = 3,
};

/**
 * - Registers input state by input event.
 * @abstract
 */
export abstract class StateInputManager
    extends Input
    implements IInput
{
    /**
     * List for registering input state.
     */
    protected inputState: Array<number> = [];

    /**
     * Whether input is blocked or not.
     */
    protected blocked: Array<boolean> = [];

    /**
     * Input target.
     * For example, div, document.
     */
    protected target: HTMLElement = this.screen.getTarget();

    /**
     * Enable for input.
     */
    protected enable: boolean = true;

    /**
     * @override
     */
    init()
    {
    }

    /**
     * @override
     */
    update()
    {
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
     * @override
     */
    clear()
    {
        for (let i = 0; i < this.inputState.length; ++i) {
            this.inputState[i] = STATE.NONE;
        }
    }

    /**
     * @override
     */
    setInputEnable(enable: boolean)
    {
        this.enable = enable;
        this.clear();
    }

    /**
     * @override
     */
    blockInput(code: number) { this.blocked[code] = true; }
    /**
     * @override
     */
    unblockInput(code: number) { this.blocked[code] = false; }

    /**
     * @override
     */
    press(code: number) { this.inputState[code] = STATE.PRESSED; }
    /**
     * @override
     */
    unpress(code: number) { this.inputState[code] = STATE.NONE; }

    /**
     * @override
     */
    isPress(code: number): boolean
    {
        return     !this.blocked[code]
                && this.inputState[code] === STATE.PRESSED;
    }

    /**
     * @override
     */
    isPressed(code: number): boolean
    {
        return     !this.blocked[code]
                && (
                       this.inputState[code] === STATE.PRESSED
                    || this.inputState[code] === STATE.ON
                );
    }
}
