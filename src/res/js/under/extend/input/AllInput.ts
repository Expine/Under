import { IMouse } from './../../base/input/IMouse';
import { IKey } from './../../base/input/IKey';
import { Input } from "../../base/input/Input";
import { GameScreen } from '../../base/screen/GameScreen';
import { IInput } from '../../base/input/IInput';

/**
 * - Manage all input state.
 * - It is realized by the delegation.
 * @classdesc Manage all input state by delegation.
 */
export class AllInput
    extends Input
    implements  IKey
              , IMouse
{
    /**
     * Mouse base code number.
     */
    protected readonly MOUSE_BASE_CODE: number = 1000;

    /**
     * Input managers for initialize and update.
     */
    protected mInputManagers: Array<Input> = [];

    /**
     * @param screen        Screen for getting screen ratio.
     * @param keyDelegate   Key instance for delegation.
     * @param mouseDelegate Mouse instance for delegation.
     */
    constructor(
        screen: GameScreen,
        protected keyDelegate: IKey,
        protected mouseDelegate: IMouse
    )
    {
        super(screen);
        // Add input managers for initialize and update
        if(keyDelegate instanceof Input) {
            this.mInputManagers.push(keyDelegate);
        }
        if(mouseDelegate instanceof Input) {
            this.mInputManagers.push(mouseDelegate);
        }
    }

    /**
     * @override
     */
    update()
    {
        for(const inputManager of this.mInputManagers) {
            inputManager.update();
        }
    }

    /**
     * @override
     */
    a() { return this.keyDelegate.a(); }
    /**
     * @override
     */
    zero() { return this.keyDelegate.zero(); }
    /**
     * @override
     */
    space() { return this.keyDelegate.space(); }

    /**
     * @override
     */
    right() { return this.keyDelegate.right(); }
    /**
     * @override
     */
    left() { return this.keyDelegate.left(); }
    /**
     * @override
     */
    up() { return this.keyDelegate.up(); }
    /**
     * @override
     */
    down() { return this.keyDelegate.down(); }

    /**
     * @override
     */
    yes() { return this.keyDelegate.yes(); }
    /**
     * @override
     */
    no() { return this.keyDelegate.no(); }
    /**
     * @override
     */
    sub() { return this.keyDelegate.sub(); }

    /**
     * @override
     */
    mRight() { return this.mouseDelegate.mRight() + this.MOUSE_BASE_CODE; }
    /**
     * @override
     */
    mLeft() { return this.mouseDelegate.mLeft() + this.MOUSE_BASE_CODE; }
    /**
     * @override
     */
    mCenter() { return this.mouseDelegate.mCenter() + this.MOUSE_BASE_CODE; }

    /**
     * @override
     */
    getMouseX() { return this.mouseDelegate.getMouseX(); }
    /**
     * @override
     */
    getMouseY() { return this.mouseDelegate.getMouseY(); }

    /**
     * @override
     */
    clear()
    {
        this.keyDelegate.clear();
        this.mouseDelegate.clear();
    }

    /**
     * @override
     */
    setInputEnable(enable: boolean)
    {
        this.mouseDelegate.setInputEnable(enable);
        this.keyDelegate.setInputEnable(enable);
    }

    /**
     * Get delegation instance by code.
     * @return Appropriate deligation instance.
     */
    protected getDelegate(code: number): IInput
    {
        if (code >= this.MOUSE_BASE_CODE) {
            return this.mouseDelegate;
        } else {
            return this.keyDelegate;
        }
    }

    /**
     * @override
     */
    blockInput(code: number)
    {
        this.getDelegate(code).blockInput(code % this.MOUSE_BASE_CODE);
    }
    /**
     * @override
     */
    unblockInput(code: number)
    {
        this.getDelegate(code).unblockInput(code % this.MOUSE_BASE_CODE);
    }

    /**
     * @override
     */
    press(code: number)
    {
        this.getDelegate(code).press(code % this.MOUSE_BASE_CODE);
    }
    /**
     * @override
     */
    unpress(code: number)
    {
        this.getDelegate(code).unpress(code % this.MOUSE_BASE_CODE);
    }

    /**
     * @override
     */
    isPress(code: number): boolean
    {
        return this.getDelegate(code).isPress(code % this.MOUSE_BASE_CODE);
    }
    /**
     * @override
     */
    isPressed(code: number): boolean
    {
        return this.getDelegate(code).isPressed(code % this.MOUSE_BASE_CODE);
    }
}
