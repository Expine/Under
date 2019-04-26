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
    protected prevent(aEvent: KeyboardEvent) {
        const code = aEvent.keyCode;
        if (   code === this.up()
            || code === this.down()
            || code === this.right()
            || code === this.left()
            || code === this.yes()
            || code === this.no()
            || code === this.sub()
        )
        {
            aEvent.preventDefault();
        }
    }

    /**
     * @override
     */
    protected onKeyDown(aEvent: KeyboardEvent)
    {
        this.prevent(aEvent);
        super.onKeyDown(aEvent);
    }
    /**
     * @override
     */
    protected onKeyUp(aEvent: KeyboardEvent) {
        this.prevent(aEvent);
        super.onKeyUp(aEvent);
    }
}
