import { DelegateScreen } from "./DelegateScreen";
import { GameScreen } from "../../base/screen/GameScreen";

/**
 * - Scales screen automatically when window is resized.
 */
export class ScalableScreen
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
            this.mGameSize = Math.min(
                (innerWidth - 16) / this.width,
                (innerHeight - 16) / this.height
            );
            canvas.width = this.gameSize * this.width;
            canvas.height = this.gameSize * this.height;
            canvas.style.width = canvas.width + `px`;
            canvas.style.height = canvas.height + `px`;
        })();
    }
}
