/**
 * Editor image
 * - Renders image
 * - Manages animation
 * - Manages multiple animations
 * - Manages animation by name
 * - It can save data
 * - Considers the direction
 * - Clips area when rendering
 * - ### Enables to use in editor
 * @extends {NamedAnimation}
 * @implements {IEditorSave}
 * @implements {IDirectionalImage}
 * @implements {IClipImage}
 * @classdesc Editor image to enable to use in editor
 */
class EditorImage extends NamedAnimation /* , IEditorSave, IDirectionalImage, IClipImage */ {
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
     * @override
     * @param {number} directionX Direction of x
     * @param {number} directionY Direction of y
     */
    setDirection(directionX, directionY) {
        if (BaseUtil.implementsOf(this.baseImage, IDirectionalImage)) {
            this.baseImage.setDirection(directionX, directionY);
        }
    }

    /**
     * Set clipingArea
     * @override
     * @param {number} clipX Cliping x position
     * @param {number} clipY Cliping y position
     * @param {number} clipWidth Cliping width
     * @param {number} clipWidth Cliping height
     */
    setClipArea(clipX, clipY, clipWidth, clipHeight) {
        if (BaseUtil.implementsOf(this.baseImage, IClipImage)) {
            this.baseImage.setClipArea(clipX, clipY, clipWidth, clipHeight);
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
     * Get list of animation
     * @override
     * @protected
     * @return {Array<GameAnimation>} List of animation
     */
    getAnimations() {
        return this.baseImage instanceof MultiAnimation ? this.baseImage.getAnimations() : null;
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
     * Set all animation ID
     * @override
     * @param {number} imageID Image ID
     */
    setAllImageID(imageID) {
        if (this.baseImage instanceof MultiAnimation) {
            this.baseImage.setAllImageID(imageID);
        }
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
     * Get list of animation elements
     * @override
     * @protected
     * @return {Array<GameImage>} List of animation elements
     */
    getImages() {
        return this.baseImage instanceof GameAnimation ? this.baseImage.getImages() : [];
    }

    /**
     * Get current image of animation
     * @override
     * @protected
     * @return {GameImage} Current image of animation
     */
    getCurrentImage() {
        return this.baseImage instanceof GameAnimation ? this.baseImage.getCurrentImage() : null;
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
     * Get image ID
     * @override
     * @return {number} Image ID
     */
    getImageID() {
        return this.baseImage.getImageID();
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
     * Get source offset x position
     * @override
     * @protected
     * @type {number}
     */
    getSourceOffsetX() {
        return this.baseImage.getSourceOffsetY();
    }

    /**
     * Get source offset y position
     * @override
     * @protected
     * @type {number}
     */
    getSourceOffsetY() {
        return this.baseImage.getSourceOffsetY();
    }

    /**
     * Get source width
     * @override
     * @protected
     * @type {number}
     */
    getSourceWidth() {
        return this.getSourceWidth();
    }

    /**
     * Get source height
     * @override
     * @protected
     * @type {number}
     */
    getSourceHeight() {
        return this.getSourceHeight();
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
}
