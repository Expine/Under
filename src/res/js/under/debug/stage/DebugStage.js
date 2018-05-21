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

        /**
         * Sequential execution mode
         * @protected
         * @type {boolean}
         */
        this.debugMode = false;
    }

    /**
     * Register debug information
     * @prtected
     * @param {number} dt Delta time
     */
    registerInformation(dt) {
        let players = this.getEntities().filter((it) => BaseUtil.implementsOf(it, IPlayable));
        if (players.length > 0) {
            let player = players[0];
            GameDebugger.it.register(`time`, `${dt} mssc`);
            GameDebugger.it.register(`collision`, `${this.getPhysicalWorld().getCollisionSize()} collision`);
            if (player instanceof InfluentialEntity) {
                GameDebugger.it.register(`pcollision`, `${player.collider.collisions.length} player collision`);
            }
            GameDebugger.it.register(`physics`, `${BaseUtil.getClassName(this.getPhysicalWorld() instanceof DebugWorld ? this.getPhysicalWorld().world : this.getPhysicalWorld())}-${BaseUtil.getClassName(this.getPhysicalWorld().getResponse())}`);
            GameDebugger.it.register(`ppos`, `Pos(${Math.floor(player.x)}, ${Math.floor(player.y)})`);
            if (player instanceof MutableEntity) {
                GameDebugger.it.register(`pvec`, `Vec(${Math.floor(player.body.velocityX)}, ${Math.floor(player.body.velocityY)})`);
                GameDebugger.it.register(`pacc`, `Acc(${Math.floor(player.body.accelerationX)},${Math.floor(player.body.accelerationY)})`);
            }
            if (player instanceof StateCharacter && player.state !== null) {
                GameDebugger.it.register(`state`, `${BaseUtil.getClassName(player.state)}`);
            }
            GameDebugger.it.register(`mouse`, `M(${Math.floor(Input.mouse.getMouseX())},${Math.floor(Input.mouse.getMouseY())})`);
        }
    }

    /**
     * Render entity information for debug
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    renderEntityInformation(ctx, shiftX, shiftY) {
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
                        if (it instanceof MutableEntity && it.body !== null) {
                            ctx.fillText(`V(${Math.floor(it.body.velocityX)}, ${Math.floor(it.body.velocityY)})`, mx - startX, my - startY + 30, 0.0, 0.0, 20, `white`);
                            ctx.fillText(`M(${Math.floor(it.body.vpx)}, ${Math.floor(it.body.vpy)}),(${Math.floor(it.body.vmx)}, ${Math.floor(it.body.vmy)})`, mx - startX, my - startY + 60, 0.0, 0.0, 20, `white`);
                            ctx.fillText(`A(${Math.floor(it.body.accelerationX)}, ${Math.floor(it.body.accelerationY)})`, mx - startX, my - startY + 90, 0.0, 0.0, 20, `white`);
                            ctx.fillText(`F((${it.body.isFixX}, ${it.body.isFixY}) - (${Math.floor(it.body.diffX)}, ${Math.floor(it.body.diffY)}))`, mx - startX, my - startY + 120, 0.0, 0.0, 20, `white`);
                        }
                    }
                } else if (BaseUtil.implementsOf(it, IColliderable)) {
                    it.getCollider().render(ctx, this.stage.camera.baseX - startX, this.stage.camera.baseY - startY);
                    if (it.getCollider().isInCollider(mx, my)) {
                        ctx.fillText(`P(${Math.floor(it.x)}, ${Math.floor(it.y)})`, mx - startX, my - startY, 0.0, 0.0, 20, `white`);
                    }
                }
            }
        }
    }

    /**
     * Set background manager
     * @override
     * @param {Background} back Background manager
     */
    setBackground(back) {
        this.stage.setBackground(back);
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
     * Set entity factory
     * @override
     * @param {EntityFactory} factory Entity factory
     */
    setFactory(factory) {
        this.stage.setFactory(factory);
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
     * Get factory
     * @override
     * @return {EntityFactory} Entity factory
     */
    getFactory() {
        return this.stage.getFactory();
    }


    /**
     * Set whether to update the stage or not
     * @override
     * @param {boolean} enable Whether to update the stage or not
     */
    setEnable(enable) {
        super.setEnable(enable);
        this.stage.setEnable(enable);
    }

    /**
     * Get whether to update the stage or not
     * @override
     * @return {boolean} Whether to update the stage or not
     */
    getEnable() {
        return this.stage.getEnable();
    }

    /**
     * Get stage width
     * @override
     * @return {number} Stage width
     */
    getStageWidth() {
        return this.stage.getStageWidth();
    }

    /**
     * Get stage height
     * @override
     * @return {number} Stage height
     */
    getStageHeight() {
        return this.stage.getStageHeight();
    }

    /**
     * Add entity to stage
     * @override
     * @param {Entity} entity Entity object
     */
    addEntity(entity) {
        entity.setStage(this);
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
     * @protected
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
     * Update background
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateBackground(dt) {
        this.stage.updateBackground(dt);
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
     * Update stage
     * @override
     * @param {number} dt Delta time
     */
    update(dt) {
        // switch mode (F)
        if (Input.key.isPress(Input.key.a() + 5)) {
            this.debugMode = !this.debugMode;
        }
        // sequential execution (A) (B)
        if (!this.debugMode || (Input.key.isPress(Input.key.a()) || Input.key.isPressed(Input.key.a() + 1))) {
            // acceleration (I)
            super.update(Input.key.isPressed(Input.key.a() + 8) ? dt * 10 : dt);
        }
        this.registerInformation(dt);
    }

    /**
     * Render background in stage
     * @override
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    renderBackground(ctx, shiftX, shiftY) {
        Timer.it.startTimer(`renderBackground`);
        this.stage.renderBackground(ctx, shiftX, shiftY);
        Timer.it.stopTimer(`renderBackground`);
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
        if (GameDebugger.debug) {
            this.renderEntityInformation(ctx, shiftX, shiftY);
        }
    }

    /**
     * Render world in stage
     * @abstract
     * @protected
     * @param {Context} ctx Canvas context
     * @param {number} shiftX Shift x position
     * @param {number} shiftY Shift y position
     */
    renderWorld(ctx, shiftX, shiftY) {
        this.stage.renderWorld(ctx, shiftX, shiftY);
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
        this.renderBackground(ctx, shiftX, shiftY);
        this.renderEntity(ctx, shiftX, shiftY);
    }
}
