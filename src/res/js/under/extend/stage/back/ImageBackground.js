/**
 * Image background
 * - Renders and update backgrdoun image
 * - ### Manages image as background
 * @interface
 * @extends {Background}
 * @classdesc Image background to manage image as background
 */
class ImageBackground extends Background { // eslint-disable-line  no-unused-vars
    /**
     * Image background constructor
     * @constructor
     * @param {GameImage} backImage Background image
     */
    constructor(backImage) {
        super();

        /**
         * Background image
         * @protected
         * @type {GameImage}
         */
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
    update(dt) {
        this.backImage.update(dt);
    }
}
