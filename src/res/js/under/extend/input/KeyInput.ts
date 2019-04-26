import { StateInputManager, STATE } from './StateInputManager';
import { IKey } from './../../base/input/IKey';
import { GameScreen } from '../../base/screen/GameScreen';

/**
 * - Manage key input event and register state.
 */
export class KeyInput
    extends StateInputManager
    implements IKey
 {


    /**
     * @param screen Screen for getting screen ratio.
     */
    constructor(screen: GameScreen)
    {
        super(screen);

        // initialize key state
        for (let i = 0; i < 255; ++i) {
            this.mInputStates.push(STATE.NONE);
        }

        if (this.mTarget.parentElement != null) {
            // key
            this.mTarget.parentElement.onkeydown = (e) =>
            {
                this.onKeyDown(e);
            };
            this.mTarget.parentElement.onkeyup = (e) =>
            {
                this.onKeyUp(e);
            };

            // clear
            const instance = this;
            const onblur = this.mTarget.parentElement.onblur;
            this.mTarget.parentElement.onblur =
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
     * Key down function.
     * @param e Key event.
     */
    protected onKeyDown(e: KeyboardEvent)
    {
        if (!this.mEnable) {
            return;
        }
        const code = e.keyCode;
        if (this.mInputStates[code] === STATE.NONE) {
            this.mInputStates[code] = STATE.PRESS;
        }
    }

    /**
     * Key up function.
     * @param e Key event.
     */
    protected onKeyUp(e: KeyboardEvent)
    {
        if (!this.mEnable) {
            return;
        }
        const code = e.keyCode;
        this.mInputStates[code] = STATE.NONE;
    }
}
