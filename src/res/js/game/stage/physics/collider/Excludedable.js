/**
 * Excludedable interface
 * @classdesc Excludedable interface
 */
class Excludedable extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Excludedable constructor
     * @constructor
     */
    constructor() {
        super();

        this.addMethod(this.getTargetID);
    }

    /**
     * Get excluded target ID
     * @interface
     * @type {number}
     */
    getTargetID() {}
}
