import { NamedEvent } from "../../../base/event/common/NamedEvent";
import { GameImage } from '../../../base/resources/image/GameImage';
import { Context } from '../../../base/resources/image/Context';

/**
 * Image event
 * - Renders the image
 * @extends {NamedEvent}
 * @classdesc Image event to render the image
 */
export class ImageEvent extends NamedEvent {
    /**
     * Image x position
     * @protected
     * @type {number}
     */
    protected x: number;
    /**
     * Image y position
     * @protected
     * @type {number}
     */
    protected y: number;
    /**
     * Image for rendering
     * @protected
     * @type {GameImage}
     */
    protected image: GameImage | null;

    /**
     * Image event constructor
     * @constructor
     * @param {string} name Identified name
     * @param {number} x Image x position
     * @param {number} y Image y position
     * @param {GameImage} image Event image
     */
    constructor(name: string, x: number, y: number, image: GameImage | null) {
        super(name);

        this.x = x;
        this.y = y;
        this.image = image;
    }

    /**
     * Initialize event
     * @override
     */
    init() {
        if (this.op !== null) {
            this.op.next();
        }
        if (this.image !== null) {
            this.image.init();
        }
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
    update(dt: number): boolean {
        if (this.image !== null) {
            this.image.update(dt);
        }
        return false;
    }

    /**
     * Render event
     * @param {Context} ctx Canvas context
     */
    render(ctx: Context) {
        if (this.image !== null) {
            this.image.render(ctx, this.x, this.y);
        }
    }
}
