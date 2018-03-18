/**
 * List of animation information for each state
 * @classdesc List of animation information for each state
 */
class StateAnimationList { // eslint-disable-line  no-unused-vars
    /**
     * State animation list constructor
     * @constructor
     */
    constructor() {
        /**
         * Animation list
         * @type {Array<StateAnimationData>}
         */
        this.animations = [];
    }

    /**
     * Add animation data
     * @param {StateAnimationData} animation Animation data
     * @return {StateAnimationList} This instance for chain
     */
    addAnimation(animation) {
        this.animations.push(animation);
        return this;
    }
}
