import { DelegateScreen } from "./DelegateScreen";

/**
 * - Scales screen automatically when window is resized.
 */
export class ScalableScreen
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
            this.gameSize = Math.min((innerWidth - 16) / this.width, (innerHeight - 16) / this.height);
            canvas.width = this.gameSize * this.width;
            canvas.height = this.gameSize * this.height;
            canvas.style.width = canvas.width + `px`;
            canvas.style.height = canvas.height + `px`;
        })();
    }
}
