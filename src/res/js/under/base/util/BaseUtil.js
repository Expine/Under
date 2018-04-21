/**
 * Convenient method group
 * @classdesc Convenient method group
 */
class BaseUtil { // eslint-disable-line  no-unused-vars
    /**
     * Whether it inherit interfaces
     * @param {Object} instance Instance to be validated
     * @param {Interface} i Interface
     * @return {bool} Whether you are implementing interfaces
     */
    static implementsOf(instance, i) {
        let inter = BaseUtil.interfaces[i.name];
        if (inter === undefined) {
            inter = BaseUtil.interfaces[i.name] = (new(i.bind(i)));
        }
        return inter.validate(instance);
    }

    /**
     * Get class name by instance
     * @param {Object} instance Instance for getting class name
     * @return {string} Class name
     */
    static getClassName(instance) {
        return instance.constructor.toString().split(`\n`)[0].split(` `)[1];
    }
}

/**
 * Singleton interface list
 * @type {Directionary<class<Interface>, Interface>}
 */
BaseUtil.interfaces = {};
