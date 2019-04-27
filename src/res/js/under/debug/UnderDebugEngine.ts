import { UnderEngine } from "../extend/UnderEngine";

/**
 * - Measure time for debugging.
 */
export class UnderDebugEngine
    extends UnderEngine
{
    /**
     * @override
     */
    update()
    {
        this.mTimer.startTimer('overall');
        this.mTimer.startTimer('update');
        super.update();
        this.mTimer.stopTimer('update');
    }

    /**
     * @override
     */
    render()
    {
        this.mTimer.startTimer('render');
        super.render();
        this.mTimer.stopTimer('render');
        this.mTimer.stopTimer('overall');
    }
}
