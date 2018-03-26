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
        return (new(i.bind(i))).validate(instance);
    }
}
