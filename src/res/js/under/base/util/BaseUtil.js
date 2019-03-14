/**
 * Convenient method group
 * @classdesc Convenient method group
 */
class BaseUtil {
    /**
     * Whether it inherit interfaces
     * @param {Object} instance Instance to be validated
     * @param {Interface} i Interface
     * @return {boolean} Whether you are implementing interfaces
     */
    static implementsOf(instance, i) {
        let inter = BaseUtil.interfaces[i.name];
        if (inter === undefined) {
            inter = BaseUtil.interfaces[i.name] = (new(i.bind(i)));
        }
        return inter.validate(instance);
    }

    /**
     * Judge whether target is interface or not
     * @param {Class} target Target class data
     * @return {boolean} Whether target is interface or not
     */
    static isInterface(target) {
        let proto = target.__proto__;
        while (proto !== null) {
            if (proto.name === `Interface`) {
                return true;
            }
            proto = proto.__proto__;
        }
        return false;
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
 * @protected
 * @type {Object<string, Interface>}
 */
BaseUtil.interfaces = {};
