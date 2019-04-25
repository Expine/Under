import { IMouse } from './../../base/input/IMouse';
import { StateInputManager, STATE } from './StateInputManager';

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
     * @override
     */
    init()
    {
        super.init();
        // initialize key state
        for (let i = 0; i < 3; ++i) {
            this.inputState.push(STATE.NONE);
        }

        // mouse
        this.target.onmousemove = (e) =>
        {
            this.onMouseMove(e);
        };
        this.target.onmousedown = (e) =>
        {
            this.onMouseDown(e);
        };
        this.target.onmouseup = (e) =>
        {
            this.onMouseUp(e);
        };

        // clear
        if (this.target.parentElement != null) {
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
     * @param e Mouse event
     */
    protected onMouseMove(e: MouseEvent)
    {
        if (this.target != null) {
            const rect = this.target.getBoundingClientRect();
            this.mouseX = (e.clientX - rect.left) / this.screen.getGameSize();
            this.mouseY = (e.clientY - rect.top) / this.screen.getGameSize();
        }
    }

    /**
     * Mouse down function
     * @param e Mouse event
     */
    protected onMouseDown(e: MouseEvent)
    {
        if (!this.enable) {
            return;
        }
        const button = e.button;
        if (this.inputState[button] === STATE.NONE) {
            this.inputState[button] = STATE.PRESS;
        }
    }

    /**
     * Mouse up function
     * @protected
     * @param e Mouse event
     */
    protected onMouseUp(e: MouseEvent)
    {
        if (!this.enable) {
            return;
        }
        const button = e.button;
        this.inputState[button] = STATE.NONE;
    }
}
