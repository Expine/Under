/**
 * Multi named animation
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
        const ret = this.animation[this.name];
        return ret !== undefined ? ret : null;
    }

    /**
     * Get list of animation
     * @override
     * @protected
     * @return {Array<GameAnimation>} List of animation
     */
    getAnimations() {
        const list = [];
        for (const it in this.animation) {
            if (this.animation.hasOwnProperty(it)) {
                list.push(this.animation[it]);
            }
        }
        return list;
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
