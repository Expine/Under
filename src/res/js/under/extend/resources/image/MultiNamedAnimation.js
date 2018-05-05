/**
 * Multi named Animation
 * - Renders image
 * - Manages animation
 * - Manages multiple animations
 * - Manages animation by name
 * - ### Sets and gets by currently name
 * @extends {NamedAnimation}
 * @classdesc Multi named animation to set and get by currently name
 */
class MultiNamedAnimation extends NamedAnimation { // eslint-disable-line  no-unused-vars
    /**
     * Multi named animation constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Dictionary of animation by string
         * @protected
         * @type {Object<string, GameAnimation>}
         */
        this.animation = {};

        /**
         * Running animation name
         * @protected
         * @type {string}
         */
        this.name = null;
    }

    /**
     * Set all animation size
     * @override
     * @param {number} width Image width
     * @param {number} height Image height
     */
    setAllSize(width, height) {
        for (let it in this.animation) {
            if (this.animation.hasOwnProperty(it)) {
                this.animation[it].setSize(width, height);
            }
        }
    }

    /**
     * Set all animation size
     * @override
     * @param {number} imageID Image ID
     */
    setAllImageID(imageID) {
        for (let it in this.animation) {
            if (this.animation.hasOwnProperty(it)) {
                this.animation[it].setImageID(imageID);
            }
        }
    }


    /**
     * Set running animation name
     * @override
     * @param {string} name Running animation name
     */
    setName(name) {
        this.name = name;
    }

    /**
     * Get animation from animations
     * @override
     * @return {GameAnimation} animation
     */
    getAnimation() {
        let ret = this.animation[this.name];
        return ret !== undefined ? ret : null;
    }

    /**
     * Set animation into animations
     * @override
     * @param {GameAnimation} animation
     */
    setAnimation(animation) {
        this.animation[this.name] = animation;
    }
}
