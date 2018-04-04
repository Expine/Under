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
     * Get hook length
     * @interface
     * @param {number} length Hook length
     */
    setLength(length) {}

    /**
     * Get hook length
     * @interface
     * @return {number} Hook length
     */
    getLength() {}

    /**
     * Release hook
     * @interface
     */
    release() {}
}
