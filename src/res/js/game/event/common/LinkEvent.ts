import { GameEvent } from "../../../under/base/event/common/GameEvent";
import { Input } from "../../../under/base/input/Input";
import { Context } from "../../../under/base/resources/image/Context";

/**
 * Link event
 * - Link other page
 * @extends {GameEvent}
 * @classdesc Link event to link other page
 */
export class LinkEvent extends GameEvent {
    /**
     * Other page url
     * @protected
     * @type {string}
     */
    protected url: string;


    /**
     * Link event constructor
     * @constructor
     * @param {string} url Other page url
     */
    constructor(url: string) {
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
        if (this.op !== null) {
            this.op.next();
        }
        if (Input.key !== null) {
            Input.key.clear();
        }
        if (Input.mouse !== null) {
            Input.mouse.clear();
        }
        window.open(this.url, '_blank');
    }

    /**
     * Destructor of event
     * @override
     */
    destruct() { }

    /**
     * Update event
     * @override
     * @param {number} dt Delta time
     * @return {boolean} Whether update is endped or not
     */
    update(_dt: number): boolean { return true; }

    /**
     * Render event
     * @override
     * @param {Context} ctx Canvas context
     */
    render(_ctx: Context) { }
}
