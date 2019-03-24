import { DelegateScreen } from "./DelegateScreen";

/**
 * Fitable screen
 * - Fits the window
 * @extends {DelegateScreen}
 * @classdesc Fitable screen to fit the window
 */
export class FitableScreen extends DelegateScreen { // eslint-disable-line     no-unused-vars
    /**
     * Initialize screen
     * @override
     */
    init() {
        super.init();
        // resize
        (window.onresize = () => {
            const size = Math.min((innerWidth - 16) / this.width, (innerHeight - 16) / this.height);
            this.width = size * this.width;
            this.height = size * this.height;
            this.delegate.getCanvas().width = this.width;
            this.delegate.getCanvas().style.width = this.delegate.getCanvas().width + `px`;
            this.delegate.getCanvas().height = this.height;
            this.delegate.getCanvas().style.height = this.delegate.getCanvas().height + `px`;
        })();
    }
}
