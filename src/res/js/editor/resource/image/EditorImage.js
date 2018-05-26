/**
 * Editor image
 * - Renders image
 * - Manages animation
 * - Manages multiple animations
 * - Manages animation by name
 * - It can save data
 * - Considers the direction
 * - ### Enables to use in editor
 * @extends {NamedAnimation}
 * @implements {IEditorSave}
 * @implements {IDirectionalImage}}
 * @classdesc Editor image to enable to use in editor
 */
class EditorImage extends NamedAnimation /* , IEditorSave, IDirectionalImage */ { // eslint-disable-line  no-unused-vars
    /**
     * Editor image constructor
     * @constructor
     * @param {GameImage} baseImage Based image
     * @param {string} root Image root path
     */
    constructor(baseImage, root) {
        super();

        /**
         * Based image
         * @protected
         * @type {GameImage}
         */
        this.baseImage = baseImage;
        /**
         * Image root path
         * @protected
         * @type {string}
         */
        this.root = root;
    }

    /**
     * Load background resource path
     * @protected
     * @param {number} id Background image ID
     */
    loadPath(id) {
        return ResourceManager.image.getPath(id).replace(`${this.root}/`, ``);
    }

    /**
     * Get json data for saving
     * @override
     * @return {JSON} Json data for saving
     */
    getSaveData() {
        const ret = {};
        let id = 0;
        if (this.baseImage instanceof MultiNamedAnimation) {
            ret.type = `multianime`;
            ret.animations = [];
            for (const it in this.baseImage.animation) {
                if (this.baseImage.animation.hasOwnProperty(it)) {
                    const anime = this.baseImage.animation[it];
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
        } else if (this.baseImage instanceof SingleAnimation) {
            ret.type = `anime`;
            if (this.baseImage.loop) {
                ret.loop = this.baseImage.loop;
            }
            ret.animation = [];
            for (const it of this.baseImage.animation) {
                if (it instanceof TileImage) {
                    const data = {};
                    id = it.imageID;
                    data.x = it.srcX;
                    data.y = it.srcY;
                    data.width = it.srcW;
                    data.height = it.srcH;
                    ret.animation.push(data);
                }
            }
        } else if (this.baseImage instanceof TileImage) {
            id = this.baseImage.imageID;
            ret.type = `tile`;
            ret.width = this.baseImage.width;
            ret.height = this.baseImage.height;
            ret.x = this.baseImage.srcX;
            ret.y = this.baseImage.srcY;
            ret.width = this.baseImage.width === this.baseImage.srcW ? undefined : this.baseImage.srcW;
            ret.height = this.baseImage.height === this.baseImage.srcH ? undefined : this.baseImage.srcH;
        } else if (this.baseImage instanceof SingleImage) {
            id = this.baseImage.imageID;
            ret.type = `single`;
            ret.width = this.baseImage.width;
            ret.height = this.baseImage.height;
        }
        ret.file = this.loadPath(id);
        return ret;
    }

    /**
     * Set direction of image
     * @abstract
     * @param {number} directionX Direction of x
     * @param {number} directionY Direction of y
     */
    setDirection(directionX, directionY) {
        if (BaseUtil.implementsOf(this.baseImage, IDirectionalImage)) {
            this.baseImage.setDirection(directionX, directionY);
        }
    }

    /**
     * Set animation name
     * @override
     * @param {string} name Animation name
     */
    setName(name) {
        if (this.baseImage instanceof NamedAnimation) {
            this.baseImage.setName(name);
        }
    }

    /**
     * Get animation from animations
     * @override
     * @return {GameAnimation} animation
     */
    getAnimation() {
        return this.baseImage instanceof MultiAnimation ? this.baseImage.getAnimation() : null;
    }

    /**
     * Set animation into animations
     * @override
     * @param {GameAnimation} animation Set animation
     */
    setAnimation(animation) {
        if (this.baseImage instanceof MultiAnimation) {
            this.baseImage.setAnimation(animation);
        }
    }

    /**
     * Set all animation size
     * @override
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setAllSize(width, height) {
        if (this.baseImage instanceof MultiAnimation) {
            this.baseImage.setAllSize(width, height);
        }
    }

    /**
     * Set all animation size
     * @override
     * @param {number} imageID Image ID
     */
    setAllImageID(imageID) {
        if (this.baseImage instanceof MultiAnimation) {
            this.baseImage.setAllImageID(imageID);
        }
    }

    /**
     * Set image size
     * @override
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setSize(width, height) {
        this.baseImage.setSize(width, height);
    }

    /**
     * Set image ID
     * @override
     * @param {number} imageID Image ID
     */
    setImageID(imageID) {
        this.baseImage.setImageID(imageID);
    }

    /**
     * Get image width
     * @override
     * @return {number} Imag width
     */
    getWidth() {
        return this.baseImage.getWidth();
    }

    /**
     * Get image height
     * @override
     * @return {number} Imag height
     */
    getHeight() {
        return this.baseImage.getHeight();
    }

    /**
     * Initialize animation
     * @override
     */
    init() {
        this.baseImage.init();
    }

    /**
     * Update animation
     * @override
     * @param {number} dt
     */
    update(dt) {
        this.baseImage.update(dt);
    }

    /**
     * Render animation
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     */
    render(ctx, x, y) {
        this.baseImage.render(ctx, x, y);
    }

    /**
     * Whether to loop or not
     * @override
     * @return {boolean} Whether to loop or not
     */
    isLoop() {
        return this.baseImage instanceof GameAnimation && this.baseImage.isLoop();
    }

    /**
     * Whether the animation has ended or not
     * @override
     * @return {boolean} Whether the animation has ended or not
     */
    isEnded() {
        return !(this.baseImage instanceof GameAnimation) || this.baseImage.isEnded();
    }

    /**
     * Get animation count indicating animation progress
     * @return {number} Animation count
     */
    getAnimationCount() {
        return this.baseImage instanceof GameAnimation ? this.baseImage.getAnimationCount() : 0;
    }

    /**
     * Add animation
     * @override
     * @param {GameImage} image Animation element
     * @param {number} delta Animation delta time
     */
    addAnimation(image, delta) {
        if (this.baseImage instanceof GameAnimation) {
            this.baseImage.addAnimation(image, delta);
        }
    }

    /**
     * Pause animation
     * @override
     */
    pause() {
        if (this.baseImage instanceof GameAnimation) {
            this.baseImage.pause();
        }
    }

    /**
     * Restore animation
     * @override
     */
    restore() {
        if (this.baseImage instanceof GameAnimation) {
            this.baseImage.restore();
        }
    }
}
