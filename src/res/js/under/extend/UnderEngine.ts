import { Engine } from "../base/Engine";

/**
 * - Executes the main loop by requestAnimationFrame.
 * - Fires updating and rendering processing respectively.
 * @classdesc Execute the main loop for firing updating and rendering.
 */
export class UnderEngine
    extends Engine
{
    /**
     * Previous measurement time
     */
    protected oldTime: number = +new Date();

    /**
     * Lambda expression for main loop.
     * @NOTE If this is a member function, 'this' will not be bounded.
     */
    protected loop: FrameRequestCallback = (_) =>
    {
        requestAnimationFrame(this.loop);
        this.update();
        this.render();
    };

    protected update()
    {
        const newTime = +new Date();
        this.mTimer.update(newTime - this.oldTime);
        this.mInput.update();
        // minimum delta time is 30 milisec
        this.mManager.update(Math.min(
            this.mTimer.getDeltatime(),
            30
        ));
        // update time
        this.oldTime = newTime;
    }

    protected render() {
        this.mContext.preRendering();
        this.mManager.render(this.mContext);
        this.mContext.postRendering();
    }

    /**
     * @override
     */
    protected main()
    {
        // start main loop
        this.oldTime = +new Date();
        requestAnimationFrame(this.loop);
    }
}
