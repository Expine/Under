/**
 * Method data class
 * @classdesc Method data class
 */
class Method {
    /**
     * Method constructor
     * @param {string} name Method name
     * @param {number} length Method arguments length
     */
    constructor(name, length) {
        /**
         * Method name
         * @type {string}
         */
        this.name = name;
        /**
         * Method arguments length
         * @type {number}
         */
        this.length = length;
    }
}
