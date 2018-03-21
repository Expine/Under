/**
 * Multi named Animation
 * Manages animations by name
 * @classdesc Animation to manage animations by name
 */
class MultiNamedAnimation extends Animation { // eslint-disable-line  no-unused-vars
    /**
     * Multi named animation constructor
     * @constructor
     * @param {string} name Initial animation name
     */
    constructor(name) {
        super();

        /**
         * Dictionary of animation by string
         * @protected
         * @type {Dictionary<string, Animation>}
         */
        this.animation = {};

        this.setName(name);
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
     * @param {string} name Running animation name
     */
    setName(name) {
        /**
         * Running animation name
         * @protected
         * @type {string}
         */
        this.name = name;
        if (this.animation[this.name] === undefined) {
            this.animation[this.name] = new SingleAnimation();
        }
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
    addAnimatiion(element) {
        this.animation[this.name].addAnimatiion(element);
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
