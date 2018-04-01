/**
 * Animationable interface
 * Enable to set animation
 * @implements {Interface}
 * @classdesc Animationable interface to enable to set animation
 */
class Animationable extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Playable constructor
     * @constructor
     */
    constructor() {
        super();

        this.addMethod(this.setAnimation);
    }

    /**
     * Set animation
     * @interface
     * @param {Animation} animation Animation
     */
    setAnimation(animation) {}
}
