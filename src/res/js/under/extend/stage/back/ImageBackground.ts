import { Background } from "../../../base/stage/back/Background";
import { GameImage } from "../../../base/resources/image/GameImage";

/**
 * Image background
 * - Manages image as background
 * @interface
 * @extends {Background}
 * @classdesc Image background to manage image as background
 */
export abstract class ImageBackground extends Background {
    /**
     * Background image
     * @protected
     * @type {GameImage}
     */
    protected backImage: GameImage;

    /**
     * Image background constructor
     * @constructor
     * @param {GameImage} backImage Background image
     */
    constructor(backImage: GameImage) {
        super();
        this.backImage = backImage;
    }

    /**
     * Initialize background
     * @override
     */
    init() {
        this.backImage.init();
    }

    /**
     * Update background
     * @override
     * @param {number} dt delta time
     */
    update(dt: number) {
        this.backImage.update(dt);
    }
}
