/**
 * Title Scene
 * - Controls updating and rendering
 * - ### Display title image
 * @extends {Scene}
 * @classdesc Title scene to display title image
 */
class TitleScene extends Scene { // eslint-disable-line  no-unused-vars
    /**
     * Title scene constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Title image id
         * @private
         * @type {GameImage}
         */
        this._title = null;
    }

    /**
     * Initialize scene
     * @override
     */
    init() {
        this._title = new SingleImage(ResourceManager.image.load(`ui/title.png`), 370, 120);
        this._title.init();
    }

    /**
     * Update scene
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        this._title.update(dt);
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
        this._title.render(ctx, 215, 240);
    }
}
