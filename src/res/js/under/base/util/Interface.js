/**
 * Interface
 * - ### Base class of interface
 * @classdesc Base class of interface
 */
class Interface { // eslint-disable-line  no-unused-vars
    /**
     * Interface constructor
     * @constructor
     */
    constructor() {
        /**
         * Methods of interface
         * @private
         * @type {Array<Method>}
         */
        this.methods_ = [];

        let proto = this.__proto__;
        if (proto) {
            for (let it of Object.getOwnPropertyNames(proto)) {
                if (it != `constructor` && proto[it] instanceof Function) {
                    this.addMethod(proto[it]);
                }
            }
            proto = proto.__proto__;
        }
    }

    /**
     * Add method of interface
     * @protected
     * @param {Function} method Method
     */
    addMethod(method) {
        this.methods_.push(new Method(method.name, method.length));
    }

    /**
     * Validate interface
     * @param {Object} instance Instance to be validated
     * @return {bool} Whether you are implementing interfaces
     */
    validate(instance) {
        if (instance === null || instance === undefined) {
            return false;
        }
        for (let it of this.methods_) {
            if (instance[it.name] instanceof Function && instance[it.name].length == it.length) {
                continue;
            }
            return false;
        }
        return true;
    }
}
