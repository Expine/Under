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
    protected readonly mouseBaseCode: number = 1000;

    /**
     * Input managers for initialize and update.
     */
    protected inputManagers: Array<Input> = [];

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
            this.inputManagers.push(keyDelegate);
        }
        if(mouseDelegate instanceof Input) {
            this.inputManagers.push(mouseDelegate);
        }
    }

    /**
     * @override
     */
    init()
    {
        this.inputManagers.forEach(it => it.init());
    }

    /**
     * @override
     */
    update()
    {
        this.inputManagers.forEach(it => it.update());
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
    mRight() { return this.mouseDelegate.mRight() + this.mouseBaseCode; }
    /**
     * @override
     */
    mLeft() { return this.mouseDelegate.mLeft() + this.mouseBaseCode; }
    /**
     * @override
     */
    mCenter() { return this.mouseDelegate.mCenter() + this.mouseBaseCode; }

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
        if (code >= this.mouseBaseCode) {
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
        this.getDelegate(code).blockInput(code % this.mouseBaseCode);
    }
    /**
     * @override
     */
    unblockInput(code: number)
    {
        this.getDelegate(code).unblockInput(code % this.mouseBaseCode);
    }

    /**
     * @override
     */
    press(code: number)
    {
        this.getDelegate(code).press(code % this.mouseBaseCode);
    }
    /**
     * @override
     */
    unpress(code: number)
    {
        this.getDelegate(code).unpress(code % this.mouseBaseCode);
    }

    /**
     * @override
     */
    isPress(code: number): boolean
    {
        return this.getDelegate(code).isPress(code % this.mouseBaseCode);
    }
    /**
     * @override
     */
    isPressed(code: number): boolean
    {
        return this.getDelegate(code).isPressed(code % this.mouseBaseCode);
    }
}
