/**
 * Debug stage
 * - Store stage size
 * - Performs updating and rendering stage
 * - Manages stage element such as entity
 * - ### Executes debug process by delegation
 * @extends {Stage}
 * @classdesc Debug stage to execute debug processs by delegation
 */
class DebugStage extends Stage { // eslint-disable-line  no-unused-vars
    /**
     * Debug stage constructor
     * @param {Stage} stage Original stage for delegation
     * @constructor
     */
    constructor(stage) {
        super(stage.stageWidth, stage.stageHeight);

        /**
         * Original stage for delegation
         * @protected
         * @type {Stage}
         */
        this.stage = stage;
    }

    /**
     * Set map manager
     * @override
     * @param {Map} map Map manager
     */
    setMap(map) {
        this.stage.setMap(map);
    }

    /**
     * Set camera
     * @override
     * @param {Camera} camera Camera
     */
    setCamera(camera) {
        this.stage.setCamera(camera);
    }

    /**
     * Set physical world
     * @override
     * @param {PhysicalWorld} physic Physical world
     */
    setPhysicalWorld(physic) {
        this.stage.setPhysicalWorld(physic);
    }

    /**
     * Get camera
     * @return {Camera} Camera of stage
     */
    getCamera() {
        return this.stage.getCamera();
    }

    /**
     * Get physical world
     * @override
     * @return {PhysicalWorld} Physical world
     */
    getPhysicalWorld() {
        return this.stage.getPhysicalWorld();
    }

    /**
     * Set whether to update the stage or not
     * @param {boolean} enable Whether to update the stage or not
     */
    setEnable(enable) {
        this.enable = enable;
        this.stage.setEnable(enable);
    }

    /**
     * Get whether to update the stage or not
     * @return {boolean} Whether to update the stage or not
     */
    getEnable() {
        return this.stage.getEnable();
    }

    /**
     * Add entity to stage
     * @override
     * @param {Entity} entity Entity object
     */
    addEntity(entity) {
        this.stage.addEntity(entity);
    }

    /**
     * Remove entity from stage
     * @override
     * @param {Entity} entity Entity object
     */
    removeEntity(entity) {
        this.stage.removeEntity(entity);
    }

    /**
     * Remove entity from stage immediately
     * @abstract
     * @param {Entity} entity Entity object
     */
    removeEntityImmediately(entity) {
        this.stage.removeEntityImmediately(entity);
    }

    /**
     * Get all entities
     * @override
     * @return {Array<Entity>} All entities
     */
    getEntities() {
        return this.stage.getEntities();
    }

    /**
     * Initialize stage
     * @override
     */
    init() {
        this.stage.init();
    }

    /**
     * Update entity in stage
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateEntity(dt) {
        Timer.it.startTimer(`entity`);
        this.stage.updateEntity(dt);
        Timer.it.stopTimer(`entity`);
    }

    /**
     * Update entity in stage by physical world
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updatePhysics(dt) {
        Timer.it.startTimer(`physics`);
        this.stage.updatePhysics(dt);
        Timer.it.stopTimer(`physics`);
    }

    /**
     * Update camera
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateCamera(dt) {
        this.stage.updateCamera(dt);
    }

    /**
     * Render map in stage
     * @override
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    renderMap(ctx, shiftX, shiftY) {
        Timer.it.startTimer(`renderMap`);
        this.stage.renderMap(ctx, shiftX, shiftY);
        Timer.it.stopTimer(`renderMap`);
    }

    /**
     * Render entities in stage
     * @override
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    renderEntity(ctx, shiftX, shiftY) {
        Timer.it.startTimer(`renderEntity`);
        this.stage.renderEntity(ctx, shiftX, shiftY);
        Timer.it.stopTimer(`renderEntity`);

        // For debug to render entity information
        if (Engine.debug) {
            let startX = -this.stage.camera.cameraX;
            let startY = -this.stage.camera.cameraY;
            let endX = startX + this.stage.camera.screenWidth;
            let endY = startY + this.stage.camera.screenHeight;
            let mx = Input.mouse.getMouseX() + startX;
            let my = Input.mouse.getMouseY() + startY;
            for (let it of this.getEntities()) {
                if (it.x + it.width >= startX && it.x < endX && it.y + it.height >= startY && it.y < endY) {
                    if (it instanceof InfluentialEntity && it.collider !== null) {
                        // render collider
                        it.collider.render(ctx, this.stage.camera.baseX - startX, this.stage.camera.baseY - startY);
                        // render information
                        if (it.collider.isInCollider(mx, my)) {
                            ctx.fillText(`P(${Math.floor(it.x)}, ${Math.floor(it.y)})`, mx - startX, my - startY, 0.0, 0.0, 20, `white`);
                            if (it.body !== undefined) {
                                ctx.fillText(`V(${Math.floor(it.body.velocityX)}, ${Math.floor(it.body.velocityY)})`, mx - startX, my - startY + 30, 0.0, 0.0, 20, `white`);
                                ctx.fillText(`M(${Math.floor(it.body.vpx)}, ${Math.floor(it.body.vpy)}),(${Math.floor(it.body.vmx)}, ${Math.floor(it.body.vmy)})`, mx - startX, my - startY + 60, 0.0, 0.0, 20, `white`);
                                ctx.fillText(`A(${Math.floor(it.body.accelerationX)}, ${Math.floor(it.body.accelerationY)})`, mx - startX, my - startY + 90, 0.0, 0.0, 20, `white`);
                                ctx.fillText(`F((${it.body.isFixX}, ${it.body.isFixY}) - (${Math.floor(it.body.diffX)}, ${Math.floor(it.body.diffY)}))`, mx - startX, my - startY + 120, 0.0, 0.0, 20, `white`);
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * Render stage
     * @override
     * @param {Context} ctx Canvas context
     * @param {number} [shiftX = 0] Shift x position
     * @param {number} [shiftY = 0] Shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        shiftX += this.stage.camera.baseX;
        shiftY += this.stage.camera.baseY;
        this.renderMap(ctx, shiftX, shiftY);
        this.renderEntity(ctx, shiftX, shiftY);
    }
}
