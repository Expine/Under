import { IMouse } from './../../base/input/IMouse';
import { StateInputManager, STATE } from './StateInputManager';
import { GameScreen } from '../../base/screen/GameScreen';
/**
 * Mouse input
 * - Manages mouse input event and register state
 * @extends {StateInputManager}
 * @classdesc Mouse input to manage mouse input event and register state
 */
export class MouseInput extends StateInputManager implements IMouse {
    /**
     * Mouse x position
     * @protected
     * @type {number}
     */
    protected mouseX: number;
    /**
     * Mouse y position
     * @protected
     * @type {number}
     */
    protected mouseY: number;

    /**
     * Mouse input constructor
     * @constructor
     * @param {GameScreen} screen Screen to input
     */
    constructor(screen: GameScreen) {
        super(screen);
        this.mouseX = 0;
        this.mouseY = 0;
    }

    /**
     * Initialize input
     * @override
     */
    init() {
        super.init();
        // initialize key state
        for (let i = 0; i < 3; ++i) {
            this.inputState.push(STATE.NONE);
        }

        // mouse
        this.target.onmousemove = (e) => {
            this.onMouseMove(e);
        };
        this.target.onmousedown = (e) => {
            this.onMouseDown(e);
        };
        this.target.onmouseup = (e) => {
            this.onMouseUp(e);
        };

        // clear
        if (this.target.parentElement != null) {
            const instance = this;
            const onblur = this.target.parentElement.onblur;
            this.target.parentElement.onblur = function (this: GlobalEventHandlers, ev: FocusEvent) {
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
     * Get mouse right code
     * @override
     * @return {number} Mouse right code
     */
    mRight(): number {
        return 2;
    }
    /**
     * Get mouse left code
     * @override
     * @return {number} Mouse left code
     */
    mLeft(): number {
        return 0;
    }
    /**
     * Get mouse center code
     * @override
     * @return {number} Mouse center code
     */
    mCenter(): number {
        return 1;
    }

    /**
     * Get mouse x position
     * @override
     * @return mouse x position
     */
    getMouseX() {
        return this.mouseX;
    }

    /**
     * Get mouse x position
     * @override
     * @return mouse x position
     */
    getMouseY() {
        return this.mouseY;
    }

    /**
     * Mouse move function
     * @protected
     * @param {MouseEvent} e - mouse event
     */
    protected onMouseMove(e: MouseEvent) {
        if (this.target != null) {
            const rect = this.target.getBoundingClientRect();
            this.mouseX = (e.clientX - rect.left) / this.screen.gameSize;
            this.mouseY = (e.clientY - rect.top) / this.screen.gameSize;
        }
    }

    /**
     * Mouse down function
     * @protected
     * @param {MouseEvent} e - mouse event
     */
    protected onMouseDown(e: MouseEvent) {
        if (!this.enable) {
            return;
        }
        const button = e.button;
        if (this.inputState[button] === undefined || this.inputState[button] === STATE.NONE) {
            this.inputState[button] = STATE.PRESS;
        }
    }

    /**
     * Mouse up function
     * @protected
     * @param {MouseEvent} e - mouse event
     */
    protected onMouseUp(e: MouseEvent) {
        if (!this.enable) {
            return;
        }
        const button = e.button;
        this.inputState[button] = STATE.NONE;
    }
}
