import { DelegateScreen } from "./DelegateScreen";

/**
 * - Fits the window to resize canvas when window is resized.
 */
export class FitableScreen
    extends DelegateScreen
{
    /**
     * @override
     */
    init()
    {
        super.init();
        // resize
        (window.onresize = () =>
        {
            const canvas = this.delegate.getCanvas();
            const size = Math.min((innerWidth - 16) / this.width, (innerHeight - 16) / this.height);
            this.width = size * this.width;
            this.height = size * this.height;
            canvas.width = this.width;
            canvas.height = this.height;
            canvas.style.width = canvas.width + `px`;
            canvas.style.height = canvas.height + `px`;
        })();
    }
}
