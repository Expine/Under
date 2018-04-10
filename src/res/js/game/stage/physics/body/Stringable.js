/**
 * Stringable interface
 * @classdesc Stringable interface
 */
class Stringable extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Stringable constructor
     * @constructor
     */
    constructor() {
        super();

        this.addMethod(this.addEntity);
        this.addMethod(this.removeEntity);
    }

    /**
     * Add entity for string
     * @interface
     * @param {StringBody} jointing Jointing body
     */
    addBody(jointing) {}

    /**
     * Remove body from string
     * @interface
     * @param {StringBody} body Joiting body
     */
    removeBody(body) {}
}
