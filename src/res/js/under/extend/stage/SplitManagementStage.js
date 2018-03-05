/**
 * Default stage sample
 * Dividingly manages entities according to type
 * Do not update immutable objects
 * @implements {Stage}
 * @classdesc Stage sample
 */
class SplitManagementStage extends Stage { // eslint-disable-line  no-unused-vars
    /**
     * Cnstructor for default stage
     * @constructor
     */
    constructor() {
        super();
        /**
         * Mutable entity list for updating and phisical operation
         * @private
         * @type {Array<MutableObject>}
         */
        this.mutables_ = [];
        /**
         * All entity list
         * @private
         * @type {Array<Entity>}
         */
        this.entities_ = [];

        /**
         * Player instance for camera
         * @type {Player}
         */
        this.player_ = null;
    }

    /**
     * Add entity to stage
     * @override
     * @param {Entity} entity - entity object
     */
    addEntity(entity) {
        if (entity instanceof Player) {
            this.player_ = entity;
        }
        if (entity instanceof MutableObject) {
            this.mutables_.push(entity);
        }
        this.entities_.push(entity);
    }

    /**
     * Update stage
     * @param {number} dt delta time
     */
    update(dt) {
        if (Input.it.isSubPress()) {
            for (let it of this.entities_) {
                if (it.collider instanceof RectangleCollder) {
                    it.setCollider(new CircleCollider(it, it.collider.endY / 2));
                } else {
                    it.setCollider(new RectangleCollder(it, 0, 0, it.collider.radius * 2, it.collider.radius * 2));
                }
            }
        }

        // update mutables and autonomies
        for (let it of this.mutables_) {
            it.update(dt);
        }
        this.physic.update(dt, this.mutables_, this.entities_);
        this.camera.setCameraPosition(this.player_.x + this.player_.width / 2, this.player_.y + this.player_.height / 2, this.map.width, this.map.height);
    }

    /**
     * Render stage
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        // render map
        this.map.render(ctx, shiftX, shiftY);
        // render entity
        let startX = -this.camera.cameraX;
        let startY = -this.camera.cameraY;
        let endX = startX + this.camera.screenWidth;
        let endY = startY + this.camera.screenHeight;
        for (let it of this.entities_) {
            if (it.x + it.width >= startX && it.x <= endX && it.y + it.height >= startY && it.y <= endY) {
                it.render(ctx, -startX, -startY);
            }
        }
    }
}