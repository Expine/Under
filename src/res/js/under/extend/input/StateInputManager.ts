import { IInput } from './../../base/input/IInput';
import { Input } from "../../base/input/Input";

/**
 * Input state
 * @enum {Enum<number>}
 */
export enum STATE
{
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
    protected mInputStates: Array<number> = [];

    /**
     * Whether input is blocked or not.
     */
    protected mBlockedList: Array<boolean> = [];

    /**
     * Input target.
     * For example, div, document.
     */
    protected mTarget: HTMLElement = this.screen.getTarget();

    /**
     * Enable for input.
     */
    protected mEnable: boolean = true;

    /**
     * @override
     */
    update()
    {
        // update input state
        for (let i = 0; i < this.mInputStates.length; ++i) {
            switch (this.mInputStates[i]) {
                case STATE.PRESS:
                    this.mInputStates[i] = STATE.PRESSED;
                    break;
                case STATE.PRESSED:
                    this.mInputStates[i] = STATE.ON;
                    break;
            }
            this.mBlockedList[i] = false;
        }
    }

    /**
     * @override
     */
    clear()
    {
        for (let i = 0; i < this.mInputStates.length; ++i) {
            this.mInputStates[i] = STATE.NONE;
        }
    }

    /**
     * @override
     */
    setInputEnable(enable: boolean)
    {
        this.mEnable = enable;
        this.clear();
    }

    /**
     * @override
     */
    blockInput(code: number) { this.mBlockedList[code] = true; }
    /**
     * @override
     */
    unblockInput(code: number) { this.mBlockedList[code] = false; }

    /**
     * @override
     */
    press(code: number) { this.mInputStates[code] = STATE.PRESSED; }
    /**
     * @override
     */
    unpress(code: number) { this.mInputStates[code] = STATE.NONE; }

    /**
     * @override
     */
    isPress(code: number): boolean
    {
        return     !this.mBlockedList[code]
                && this.mInputStates[code] === STATE.PRESSED;
    }

    /**
     * @override
     */
    isPressed(code: number): boolean
    {
        return     !this.mBlockedList[code]
                && (   this.mInputStates[code] === STATE.PRESSED
                    || this.mInputStates[code] === STATE.ON
                );
    }
}
