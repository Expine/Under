/**
 * Title Scene
 * - Controls updating and rendering
 * - ### Display title image
 * @implements {Scene}
 * @classdesc Title scene to display title image
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
        this.title_ = ResourceManager.image.load(`ui/title.png`);
    }

    /**
     * Update scene
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        if (Input.key.isPress(Input.key.yes())) {
            SceneManager.it.replaceScene(new GameScene());
        }
    }

    /**
     * Render scene
     * @override
     * @param {Context} ctx Canvas context
     */
    render(ctx) {
        ctx.drawImage(this.title_, 215, 240, 370, 120);
    }
}
