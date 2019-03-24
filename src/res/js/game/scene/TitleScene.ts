import { GameText } from './../../under/extend/resources/image/GameText';
import { SingleImage } from './../../under/extend/resources/image/SingleImage';
import { GameImage } from './../../under/base/resources/image/GameImage';
import { Scene } from "../../under/base/scene/Scene";
import { Context } from '../../under/base/resources/image/Context';
import { Input } from '../../under/base/input/Input';
import { ResourceManager } from '../../under/base/resources/ResourceManager';
import { SceneManager } from '../../under/base/scene/SceneManager';
import { GameScene } from './GameScene';

/**
 * Title Scene
 * - Display title image
 * @extends {Scene}
 * @classdesc Title scene to display title image
 */
export class TitleScene extends Scene {
    /**
     * Title image id
     * @private
     * @type {GameImage}
     */
    _title: GameImage;

    /**
     * Title text
     * @private
     * @type {GameImage}
     */
    _titleText: GameImage;

    /**
     * Title scene constructor
     * @constructor
     */
    constructor() {
        super();
        this._title = new SingleImage(ResourceManager.image.load(`ui/title.png`), 370, 120);
        this._titleText = new GameText(`Press Z to start`, 30, `white`);
    }

    /**
     * Initialize scene
     * @override
     */
    init() {
        this._title.init();
        this._titleText.init();
    }

    /**
     * Update scene
     * @override
     * @param {number} dt Delta time
     */
    update(dt: number) {
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
    render(ctx: Context) {
        this._title.render(ctx, 215, 240);
        this._titleText.render(ctx, 400, 450);
    }
}
