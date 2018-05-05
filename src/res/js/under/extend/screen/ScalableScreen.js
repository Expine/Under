/**
 * Scalable screen
 * - Indicates the rendering target and input target
 * - Delegates the process to the destination
 * - ### Scales screen automatically
 * @extends {DelegateScreen}
 * @classdesc Scalable screen to scale automatically
 */
class ScalableScreen extends DelegateScreen { // eslint-disable-line     no-unused-vars
    /**
     * Initialize screen
     * @override
     */
    init() {
        super.init();
        // resize
        (window.onresize = () => {
            this.gameSize = Math.min((innerWidth - 16) / this.width, (innerHeight - 16) / this.height);
            this.delegate.getCanvas().width = this.gameSize * this.width;
            this.delegate.getCanvas().style.width = this.delegate.getCanvas().width + `px`;
            this.delegate.getCanvas().height = this.gameSize * this.height;
            this.delegate.getCanvas().style.height = this.delegate.getCanvas().height + `px`;
        })();
    }
}
