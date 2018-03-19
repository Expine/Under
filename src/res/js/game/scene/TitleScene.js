/**
 * Title Scene
 * @implements {Scene}
 * @classdesc Title scene class
 */
class TitleScene extends Scene { // eslint-disable-line  no-unused-vars
    /**
     * Initialize scene
     * @override
     */
    init() {
        /**
         * Title image id
         * @private
         * @type {number}
         */
        this.title_ = ContextImage.it.loadImage(`res/image/ui/title.png`);
    }

    /**
     * Update scene
     * @override
     * @param {number} dt - delta time
     */
    update(dt) {
        if (Input.it.isYesPress()) {
            SceneManager.it.replaceScene(new GameScene());
        }
    }

    /**
     * Render scene
     * @override
     * @param {Context} ctx
     */
    render(ctx) {
        ctx.drawImage(this.title_, 215, 240, 370, 120);
    }
}
