import { IMouse } from './../../base/input/IMouse';
import { StateInputManager, STATE } from './StateInputManager';
import { GameScreen } from '../../base/screen/GameScreen';

/**
 * - Manage mouse input event and register state.
 */
export class MouseInput
    extends StateInputManager
    implements IMouse
{
    /**
     * Mouse x position.
     */
    protected mouseX: number = 0;
    /**
     * Mouse y position.
     */
    protected mouseY: number = 0;

    /**
     * @param screen Screen for getting screen ratio.
     */
    constructor(screen: GameScreen)
    {
        super(screen);

        // initialize key state
        for (let i = 0; i < 3; ++i) {
            this.mInputStates.push(STATE.NONE);
        }

        // mouse
        this.mTarget.onmousemove = (aEvent: MouseEvent) =>
        {
            this.onMouseMove(aEvent);
        };
        this.mTarget.onmousedown = (aEvent: MouseEvent) =>
        {
            this.onMouseDown(aEvent);
        };
        this.mTarget.onmouseup = (aEvent: MouseEvent) =>
        {
            this.onMouseUp(aEvent);
        };

        // clear
        if (this.mTarget.parentElement != null) {
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

        // ban context menu
        document.oncontextmenu = function () {
            return false;
        };
    }

    /**
     * @override
     */
    mRight() { return 2; }
    /**
     * @override
     */
    mLeft() { return 0; }
    /**
     * @override
     */
    mCenter() { return 1; }

    /**
     * @override
     */
    getMouseX() { return this.mouseX; }

    /**
     * @override
     */
    getMouseY() { return this.mouseY; }

    /**
     * Mouse move function
     * @param aEvent Mouse event
     */
    protected onMouseMove(aEvent: MouseEvent)
    {
        if (this.mTarget != null) {
            const rect = this.mTarget.getBoundingClientRect();
            this.mouseX = (aEvent.clientX - rect.left) / this.screen.gameSize;
            this.mouseY = (aEvent.clientY - rect.top) / this.screen.gameSize;
        }
    }

    /**
     * Mouse down function
     * @param aEvent Mouse event
     */
    protected onMouseDown(aEvent: MouseEvent)
    {
        if (!this.mEnable) {
            return;
        }
        const button = aEvent.button;
        if (this.mInputStates[button] === STATE.NONE) {
            this.mInputStates[button] = STATE.PRESS;
        }
    }

    /**
     * Mouse up function
     * @protected
     * @param aEvent Mouse event
     */
    protected onMouseUp(aEvent: MouseEvent)
    {
        if (!this.mEnable) {
            return;
        }
        const button = aEvent.button;
        this.mInputStates[button] = STATE.NONE;
    }
}
