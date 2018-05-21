/**
 * Editor background
 * - Renders and update background image
 * - It can save data
 * - ### Delegate background and enable to save
 * @interface
 * @extends {Background}
 * @implements {IEditorSave}
 * @classdesc Editor background to delegate background and enable to save
 */
class EditorBackground extends Background /* , IEditorSave */ { // eslint-disable-line  no-unused-vars
    /**
     * Editor background constructor
     * @constructor
     * @param {BackGround} baseBackground Base delegation background
     */
    constructor(baseBackground) {
        super();

        /**
         * Base delegation background
         * @type {Background}
         * @protected
         */
        this.baseBackground = baseBackground;
    }

    /**
     * Load background resource path
     * @protected
     * @param {number} id Background image ID
     */
    loadPath(id) {
        return ResourceManager.image.getPath(id).replace(`back/`, ``);
    }

    /**
     * Get image json data by image
     * @protected
     * @param {GameImage} image Image for getting json data
     * @return {JSON} Image json data
     */
    getImageData(image) {
        const ret = {};
        const id = 0;
        if (image instanceof MultiNamedAnimation) {
            ret.type = `multianime`;
            ret.animations = [];
            for (const it in image.animation) {
                if (image.animation.hasOwnProperty(it)) {
                    const anime = image.animation[it];
                    if (anime instanceof SingleAnimation) {
                        let width = 0;
                        let height = 0;
                        const animeData = {};
                        animeData.name = it;
                        if (anime.loop) {
                            animeData.loop = anime.loop;
                        }
                        animeData.animaton = [];
                        for (const e of anime.animation) {
                            if (e instanceof TileImage) {
                                id = e.imageID;
                                width = e.width;
                                height = e.height;
                                const data = {};
                                data.x = e.srcX;
                                data.y = e.srcY;
                                data.width = e.srcW;
                                data.height = e.srcH;
                                animeData.animation.push(data);
                            }
                        }
                        animeData.width = width;
                        animeData.height = height;
                        ret.animations.push(animeData);
                    }
                }
            }
        } else if (image instanceof SingleAnimation) {
            ret.type = `anime`;
            if (image.loop) {
                ret.loop = image.loop;
            }
            ret.animation = [];
            for (const it of image.animation) {
                if (it instanceof TileImage) {
                    const data = {};
                    data.x = it.srcX;
                    data.y = it.srcY;
                    data.width = it.srcW;
                    data.height = it.srcH;
                    ret.animation.push(data);
                }
            }
        } else if (image instanceof TileImage) {
            ret.type = `tile`;
            ret.width = image.width;
            ret.height = image.height;
            ret.x = image.srcX;
            ret.y = image.srcY;
            ret.width = image.width === image.srcW ? undefined : image.srcW;
            ret.height = image.height === image.srcH ? undefined : image.srcH;
        } else if (image instanceof SingleImage) {
            ret.type = `single`;
            ret.width = image.width;
            ret.height = image.height;
        }
        ret.file = this.loadPath(id);
        return ret;
    }

    /**
     * Unparses from background to json
     * @protected
     * @param {Background} back Background to unparse
     * @return {JSON} Json data
     */
    unparse(back) {
        const ret = {};
        if (back instanceof EditorBackground) {
            back = back.baseBackground;
        }
        if (back instanceof SequentialBackground) {
            ret.type = `Sequential`;
            ret.backs = [];
            for (const it of back.backs) {
                ret.backs.push(this.unparse(it));
            }
        } else if (back instanceof InvariantBackground) {
            ret.type = `Invariant`;
        } else if (back instanceof MovementBackground) {
            ret.type = `Movement`;
            ret.x = back.x;
            ret.y = back.y;
            ret.rx = back.speedRatioX;
            ret.ry = back.speedRatioY;
        } else if (back instanceof AreaBackground) {
            ret.type = `Area`;
            ret.x = back.x;
            ret.y = back.y;
            ret.width = back.areaHeight;
            ret.height = back.areaHeight;
        } else if (back instanceof FixedBackground) {
            ret.type = `Fixed`;
            ret.x = back.x;
            ret.y = back.y;
        }
        if (back instanceof ImageBackground) {
            ret.image = this.getImageData(back.backImage);
        }
        return ret;
    }

    /**
     * Get json data for saving
     * @override
     * @return {JSON} Json data for saving
     */
    getSaveData() {
        return this.unparse(this.baseBackground);
    }

    /**
     * Initialize background
     * @override
     */
    init() {
        this.baseBackground.update();
    }

    /**
     * Update background
     * @override
     * @param {number} dt delta time
     */
    update(dt) {
        this.baseBackground.update(dt);
    }

    /**
     * Render background
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     * @param {number} screenWidth Scren width
     * @param {number} screenWidth Scren height
     */
    render(ctx, shiftX, shiftY, screenWidth, screenHeight) {
        this.baseBackground.render(ctx, shiftX, shiftY, screenWidth, screenHeight);
    }
}
