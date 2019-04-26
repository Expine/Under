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
            this.mTarget.parentElement.onkeydown = (aEvent: KeyboardEvent) =>
            {
                this.onKeyDown(aEvent);
            };
            this.mTarget.parentElement.onkeyup = (aEvent: KeyboardEvent) =>
            {
                this.onKeyUp(aEvent);
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
     * @param aEvent Key event.
     */
    protected onKeyDown(aEvent: KeyboardEvent)
    {
        if (!this.mEnable) {
            return;
        }
        const code = aEvent.keyCode;
        if (this.mInputStates[code] === STATE.NONE) {
            this.mInputStates[code] = STATE.PRESS;
        }
    }

    /**
     * Key up function.
     * @param aEvent Key event.
     */
    protected onKeyUp(aEvent: KeyboardEvent)
    {
        if (!this.mEnable) {
            return;
        }
        const code = aEvent.keyCode;
        this.mInputStates[code] = STATE.NONE;
    }
}
