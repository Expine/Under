// TODO: Comment
/**
 * Vanish tile object
 * - Object present on the stage that has coordinate and size
 * - Has image ID
 * - It can be collided because it has material and collider
 * - It is fixed and no change will occur
 * - ### Decides the tile to be displayed by the ID and position, using the sprite indicating the stage tiles
 * @extends {TileObject}
 * @classdesc Vanish tile object to decide the tile to be displayed by the IDand position, using the sprite indecating the stage tiles
 */
class VanishTileObject extends TileObject { // eslint-disable-line  no-unused-vars
    /**
     * Vanish tile object constructor
     * @constructor
     * @param {number} showTime Show time
     * @param {number} hideTime Hide time
     */
    constructor(showTime, hideTime) {
        super();
        this.showTime = showTime;
        this.hideTime = hideTime;
    }

    /**
     * Initialize entity
     * @override
     */
    init() {
        super.init();
        if (this.showTime > 0) {
            this.collider.response = false;
        }
    }


    /**
     * Update entty
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        super.update(dt);

        if (this.showTime > 0) {
            this.showTime -= dt / 1000;
        } else if (this.hideTime > 0) {
            this.hideTime -= dt / 1000;
        }
        if (this.showTime < 0) {
            this.showTime = 0;
            this.collider.response = true;
        }
        if (this.hideTime < 0) {
            this.hideTime = 0;
            this.collider.response = false;
        }
    }

    /**
     * Render entity
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        if (this.showTime == 0 && this.hideTime > 0) {
            if (this.hideTime < 1 && Math.floor(this.hideTime * 1000) % 2 == 0) {
                return;
            }
            super.render(ctx, shiftX, shiftY);
        }
    }
}
