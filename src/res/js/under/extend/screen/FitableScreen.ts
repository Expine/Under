import { DelegateScreen } from "./DelegateScreen";
import { GameScreen } from "../../base/screen/GameScreen";

/**
 * - Fits the window to resize canvas when window is resized.
 */
export class FitableScreen
    extends DelegateScreen
{
    /**
    * @param delegate Original screen for delegating the process.
    */
   constructor(delegate: GameScreen)
   {
       super(delegate);

        // resize
        (window.onresize = () =>
        {
            const canvas = this.delegate.getCanvas();
            const size = Math.min(
                (innerWidth - 16) / this.width,
                (innerHeight - 16) / this.height
            );
            this.mWidth = size * this.width;
            this.mHeight = size * this.height;
            canvas.width = this.width;
            canvas.height = this.height;
            canvas.style.width = canvas.width + `px`;
            canvas.style.height = canvas.height + `px`;
        })();
    }
}
