import { StateInputManager, STATE } from './StateInputManager';
import { IKey } from './../../base/input/IKey';

/**
 * - Manage key input event and register state.
 */
export class KeyInput
    extends StateInputManager
    implements IKey
 {
    /**
     * @override
     */
    init()
    {
        super.init();
        // initialize key state
        for (let i = 0; i < 255; ++i) {
            this.inputState.push(STATE.NONE);
        }

        if (this.target.parentElement != null) {
            // key
            this.target.parentElement.onkeydown = (e) => {
                this.onKeyDown(e);
            };
            this.target.parentElement.onkeyup = (e) => {
                this.onKeyUp(e);
            };

            // clear
            const instance = this;
            const onblur = this.target.parentElement.onblur;
            this.target.parentElement.onblur =
                function (this: GlobalEventHandlers, ev: FocusEvent)
                {
                    instance.clear();
                    if (onblur !== undefined && onblur !== null) {
                        onblur.apply(this, [ev]);
                    }
                };
        }
    }

    /**
     * @override
     */
    a() { return 65; }
    /**
     * @override
     */
    zero() { return 48; }
    /**
     * @override
     */
    space() { return 13; }

    /**
     * @override
     */
    right() { return 39; }
    /**
     * @override
     */
    left() { return 37; }
    /**
     * @override
     */
    up() { return 38; }
    /**
     * @override
     */
    down() { return 40; }

    /**
     * @override
     */
    yes() { return 90; }
    /**
     * @override
     */
    no() { return 88; }
    /**
     * @override
     */
    sub() { return 67; }

    /**
     * Key down function
     * @param e Key event
     */
    protected onKeyDown(e: KeyboardEvent)
    {
        if (!this.enable) {
            return;
        }
        const code = e.keyCode;
        if (this.inputState[code] === STATE.NONE) {
            this.inputState[code] = STATE.PRESS;
        }
    }

    /**
     * Key up function
     * @protected
     * @param e Key event
     */
    protected onKeyUp(e: KeyboardEvent)
    {
        if (!this.enable) {
            return;
        }
        const code = e.keyCode;
        this.inputState[code] = STATE.NONE;
    }
}
