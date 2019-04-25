import { KeyInput } from './KeyInput';

/**
 * - Prevent default key function.
 */
export class PreventKeyInput
    extends KeyInput
{
    /**
     * Prevent key event if it's key code is used.
     * @param e Key event.
     */
    protected prevent(e: KeyboardEvent) {
        const code = e.keyCode;
        if (   code === this.up()
            || code === this.down()
            || code === this.right()
            || code === this.left()
            || code === this.yes()
            || code === this.no()
            || code === this.sub()
        )
        {
            e.preventDefault();
        }
    }

    /**
     * @override
     */
    protected onKeyDown(e: KeyboardEvent)
    {
        this.prevent(e);
        super.onKeyDown(e);
    }
    /**
     * @override
     */
    protected onKeyUp(e: KeyboardEvent) {
        this.prevent(e);
        super.onKeyUp(e);
    }
}
