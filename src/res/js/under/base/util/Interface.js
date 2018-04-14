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

        /**
         * Getters of interface
         * @private
         * @type {Array<string>}
         */
        this.getters = [];
        /**
         * Setters of interface
         * @private
         * @type {Array<string>}
         */
        this.setters = [];

        // add method automatically
        let proto = this.__proto__;
        while (proto !== null) {
            let breakLoop = false;
            for (let it of Object.getOwnPropertyNames(proto)) {
                if (it == `constructor`) {
                    if (proto[it] === Interface) {
                        breakLoop = true;
                        break;
                    }
                    continue;
                }
                if (proto[it] instanceof Function) {
                    this.addMethod(proto[it]);
                }
                let disc = Object.getOwnPropertyDescriptor(proto, it);
                if (disc !== undefined) {
                    if (disc.get !== undefined) {
                        this.getters.push(it);
                    }
                    if (disc.set !== undefined) {
                        this.setters.push(it);
                    }
                }
            }
            if (breakLoop) {
                break;
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
        for (let it of this.getters) {
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
        for (let it of this.setters) {
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
