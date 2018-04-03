/**
 * Hookable
 * It belongs to the character and releasing of the hook is possible
 * @classdesc Hookable that belongs to the character and releasing of the hook is possible
 */
class Hookable extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Hookable constructor
     * @constructor
     */
    constructor() {
        super();

        this.addMethod(this.getActor);
        this.addMethod(this.release);
    }

    /**
     * Get actor who it belongs to
     * @interface
     * @return {Entity} Actor who it belongs to
     */
    getActor() {}

    /**
     * Release hook
     * @interface
     */
    release() {}
}
