/**
 * Split management stage
 * Dividingly manages entities according to type
 * Do not update immutable objects
 * @implements {Stage}
 * @classdesc Split management stage to manage entities according to type dividingly
 */
class SplitManagementStage extends Stage { // eslint-disable-line  no-unused-vars
    /**
     * Split management stage
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
         * @orivate
         * @type {Player}
         */
        this.player_ = null;
    }

    /**
     * Add entity to stage
     * @override
     * @param {Entity} Pentity - entity object
     */
    addEntity(entity) {
        if (entity instanceof Player) {
            this.player_ = entity;
        }
        if (entity instanceof MutableObject) {
            this.mutables_.push(entity);
            this.physic.addActor(entity);
        }
        this.entities_.push(entity);
        this.physic.addEntity(entity);
        entity.setStage(this);
        entity.init();
    }

    /**
     * Remove entity from stage
     * @override
     * @param {Entity} entity - entity object
     */
    removeEntity(entity) {
        if (entity instanceof MutableObject) {
            this.mutables_.splice(this.mutables_.indexOf(entity), 1);
        }
        this.entities_.splice(this.entities_.indexOf(entity), 1);
        this.physic.removeEntity(entity);
    }

    /**
     * Control stage update
     * @override
     * @param {bool} enable Whether to update the stage or not
     */
    setEnable(enable) {
        this.enable_ = enable;
    }

    /**
     * Get all entities
     * @override
     * @return {Array<Entity>} All entities
     */
    getEntities() {
        return this.entities_;
    }

    /**
     * Update stage
     * @override
     * @param {number} dt delta time
     */
    update(dt) {
        if (!this.enable) {
            return;
        }
        // if (Input.it.isKeyPress(Input.it.A) || Input.it.isKeyPressed(Input.it.A + 1)) {
        // update mutables and autonomies
        for (let it of this.mutables_) {
            it.update(dt);
        }
        this.physic.update(dt, this.mutables_, this.entities_);
        // }
        if (this.player_ != null) {
            this.camera.setCameraPosition(this.player_.x + this.player_.width / 2, this.player_.y + this.player_.height / 2, this.map.width, this.map.height);
        }
    }

    /**
     * Render stage
     * @override
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        // render map
        this.map.render(ctx, this.x + shiftX, this.y + shiftY);
        // render entity
        let startX = -this.camera.cameraX;
        let startY = -this.camera.cameraY;
        let endX = startX + this.camera.screenWidth;
        let endY = startY + this.camera.screenHeight;
        for (let it of this.entities_) {
            if (it.x + it.width >= startX && it.x < endX && it.y + it.height >= startY && it.y < endY) {
                it.render(ctx, this.x - startX, this.y - startY);
            }
        }

        // For debug to render entity information
        if (Engine.debug) {
            let mx = Input.it.getMouseX() + startX;
            let my = Input.it.getMouseY() + startY;
            for (let it of this.entities_) {
                if (it.collider !== undefined && it.collider.isInCollider(mx, my)) {
                    ctx.fillText(`(${Math.floor(it.x)}, ${Math.floor(it.y)})`, mx - startX, my - startY, 0.0, 0.0, 20, `white`);
                    if (it.body !== undefined) {
                        ctx.fillText(`(${Math.floor(it.body.velocityX)}, ${Math.floor(it.body.velocityY)})`, mx - startX, my - startY + 30, 0.0, 0.0, 20, `white`);
                        ctx.fillText(`(${Math.floor(it.body.vpx)}, ${Math.floor(it.body.vpy)}),(${Math.floor(it.body.vmx)}, ${Math.floor(it.body.vmy)})`, mx - startX, my - startY + 60, 0.0, 0.0, 20, `white`);
                        ctx.fillText(`(${Math.floor(it.body.preAccelerationX)}, ${Math.floor(it.body.preAccelerationY)})`, mx - startX, my - startY + 90, 0.0, 0.0, 20, `white`);
                    }
                }
            }
        }
    }
}
