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
        this._methods = [];

        /**
         * Getters of interface
         * @private
         * @type {Array<string>}
         */
        this._getters = [];
        /**
         * Setters of interface
         * @private
         * @type {Array<string>}
         */
        this._setters = [];

        // add methods
        this.addMethodsAutomatically();
    }

    /**
     * Add method automatically
     * @protected
     */
    addMethodsAutomatically() {
        let proto = this.__proto__;
        while (proto !== null) {
            for (let it of Object.getOwnPropertyNames(proto)) {
                // If it traces up to Interface, it ends
                if (it === `constructor`) {
                    if (proto[it] === Interface) {
                        return;
                    }
                    continue;
                }
                // add methods
                if (proto[it] instanceof Function) {
                    this.addMethod(proto[it]);
                }
                // add getter and setter
                let disc = Object.getOwnPropertyDescriptor(proto, it);
                if (disc !== undefined) {
                    if (disc.get !== undefined) {
                        this._getters.push(it);
                    }
                    if (disc.set !== undefined) {
                        this._setters.push(it);
                    }
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
        this._methods.push(new Method(method.name, method.length));
    }

    /**
     * Validate interface
     * @param {Object} instance Instance to be validated
     * @return {boolean} Whether you are implementing interfaces
     */
    validate(instance) {
        if (instance === null || instance === undefined) {
            return false;
        }
        // check method
        for (let it of this._methods) {
            if (instance[it.name] instanceof Function && instance[it.name].length === it.length) {
                continue;
            }
            return false;
        }
        // check getter
        for (let it of this._getters) {
            let proto = instance.__proto__;
            let exists = false;
            while (proto !== null) {
                let disc = Object.getOwnPropertyDescriptor(proto, it);
                if (disc !== undefined && disc.get !== undefined) {
                    exists = true;
                    break;
                }
                proto = proto.__proto__;
            }
            if (exists) {
                continue;
            }
            return false;
        }
        // check setter
        for (let it of this._setters) {
            let proto = instance.__proto__;
            let exists = false;
            while (proto !== null) {
                let disc = Object.getOwnPropertyDescriptor(proto, it);
                if (disc !== undefined && disc.set !== undefined) {
                    exists = true;
                    break;
                }
                proto = proto.__proto__;
            }
            if (exists) {
                continue;
            }
            return false;
        }
        return true;
    }
}
