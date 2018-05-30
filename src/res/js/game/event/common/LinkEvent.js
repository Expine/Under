/**
 * Link event
 * - Updates and renders event
 * - ### Link other page
 * @extends {GameEvent}
 * @classdesc Link event to link other page
 */
class LinkEvent extends GameEvent { // eslint-disable-line  no-unused-vars
    /**
     * Link event constructor
     * @constructor
     * @param {string} url Other page url
     */
    constructor(url) {
        super();

        /**
         * Other page url
         * @protected
         * @type {string}
         */
        this.url = url;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        this.op.next();
        if (Input.key !== null) {
            Input.key.clear();
        }
        if (Input.mouse !== null) {
            Input.mouse.clear();
        }
        window.open(this.url, `_blank`);
    }
}
