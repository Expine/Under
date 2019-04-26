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
    setInputEnable(aEnable: boolean)
    {
        this.mEnable = aEnable;
        this.clear();
    }

    /**
     * @override
     */
    blockInput(aCode: number) { this.mBlockedList[aCode] = true; }
    /**
     * @override
     */
    unblockInput(aCode: number) { this.mBlockedList[aCode] = false; }

    /**
     * @override
     */
    press(aCode: number) { this.mInputStates[aCode] = STATE.PRESSED; }
    /**
     * @override
     */
    unpress(aCode: number) { this.mInputStates[aCode] = STATE.NONE; }

    /**
     * @override
     */
    isPress(aCode: number): boolean
    {
        return     !this.mBlockedList[aCode]
                && this.mInputStates[aCode] === STATE.PRESSED;
    }

    /**
     * @override
     */
    isPressed(aCode: number): boolean
    {
        return     !this.mBlockedList[aCode]
                && (   this.mInputStates[aCode] === STATE.PRESSED
                    || this.mInputStates[aCode] === STATE.ON
                );
    }
}
