/**
 * Entity
 * Object present on the stage
 * Has coordinates and sizes
 * May have images
 * @classdesc Stage entity
 */
class Entity { // eslint-disable-line  no-unused-vars
    /**
     * Entity constructor
     * @constructor
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width object width
     * @param {number} height object height
     * @param {number} imageID image ID for rendering (if has not, -1)
     */
    constructor(x, y, width, height, imageID = -1) {
        /**
         * Entity x position
         * @type {number}
         */
        this.x = x;
        /**
         * Entity y position
         * @type {number}
         */
        this.y = y;
        /**
         * Entity width
         * @type {number}
         */
        this.width = width;
        /**
         * Entity height
         * @type {number}
         */
        this.height = height;
        /**
         * Entity image id
         * @protected
         * @type {number}
         */
        this.imageID = imageID;

        /**
         * X direction of entity
         * @type {number}
         */
        this.directionX = 0;
        /**
         * Y direction of entity
         * @type {number}
         */
        this.directionY = 0;
    }

    /**
     * Set stage
     * @param {Stage} stage  Stage information
     */
    setStage(stage) {
        /**
         * Stage information
         * @type {Stage}
         */
        this.stage = stage;
    }

    /**
     * Set collider
     * @param {Collider} collider collider
     */
    setCollider(collider) {
        /**
         * Entity collider
         * @type {Collider}
         */
        this.collider = collider;
        // initialize
        collider.setEntity(this);
        collider.init();
    }

    /**
     * Set material
     * @param {Material} material Material information
     */
    setMaterial(material) {
        /**
         * Material inofrmation
         * @type {Material}
         */
        this.material = material;
    }

    /**
     * Initialize entity
     * @interface
     */
    init() {}

    /**
     * Update entty
     * @interface
     * @param {number} dt - delta time
     */
    update(dt) {}

    /**
     * Render entity
     * @interface
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {}
}
