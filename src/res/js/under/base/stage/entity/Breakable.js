/**
 * Breakable interface
 * Object that can be damaged
 * And can be destroyed
 * @implements {Interface}
 * @classdesc Breakable interface that can be damaged and destroyed
 */
class Breakable extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Breakable constructor
     * @constructor
     */
    constructor() {
        super();
        this.addMethod(this.destroy);
    }
    /**
     * Destroy object
     * @interface
     */
    destroy() {}
}
