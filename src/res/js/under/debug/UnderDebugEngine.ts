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
        this.timer.startTimer(`overall`);
        this.timer.startTimer(`update`);
        super.update();
        this.timer.stopTimer(`update`);
    }

    /**
     * @override
     */
    render()
    {
        this.timer.startTimer(`render`);
        super.render();
        this.timer.stopTimer(`render`);
        this.timer.stopTimer(`overall`);
    }
}
