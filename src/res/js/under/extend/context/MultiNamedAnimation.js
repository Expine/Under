/**
 * Multi named Animation
 * Manages animations by name
 * @implements {NamedAnimation}
 * @classdesc Animation to manage animations by name
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
         * @type {Dictionary<string, Animation>}
         */
        this.animation = {};
    }

    /**
     * Initialize animation
     * @override
     */
    init() {
        this.animation[this.name].init();
    }

    /**
     * Set running animation name
     * @override
     * @param {string} name Running animation name
     * @return {NamedAnimation} This instance
     */
    setName(name) {
        /**
         * Running animation name
         * @protected
         * @type {string}
         */
        this.name = name;
        return this;
    }

    /**
     * Get animation from animations
     * @override
     * @return {Animation} animation
     */
    getAnimation() {
        return this.animation[this.name];
    }

    /**
     * Set animation into animations
     * @interface
     * @param {Animation} animation
     */
    setAnimation(animation) {
        this.animation[this.name] = animation;
    }

    /**
     * Set whether to loop or not
     * @override
     * @param {bool} loop Whether to loop or not
     */
    setLoop(loop) {
        this.animation[this.name].setLoop(loop);
    }

    /**
     * Whether to loop or not
     * @override
     * @return {bool} Whether to loop or not
     */
    isLoop() {
        return this.animation[this.name].isLoop();
    }

    /**
     * Whether the animation has ended or not
     * @override
     * @return {bool} Whether the animation has ended or not
     */
    isEnded() {
        return this.animation[this.name].isEnded();
    }

    /**
     * Add animation
     * @override
     * @param {AnimationElement} element Animation element
     */
    addAnimation(element) {
        this.animation[this.name].addAnimation(element);
    }

    /**
     * Update animation
     * @override
     * @param {number} dt
     */
    update(dt) {
        this.animation[this.name].update(dt);
    }

    /**
     * Render animation
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} x Image x position
     * @param {number} y Image y position
     * @param {number} width Image width
     * @param {number} height Image height
     */
    render(ctx, x, y, width, height) {
        this.animation[this.name].render(ctx, x, y, width, height);
    }
}
