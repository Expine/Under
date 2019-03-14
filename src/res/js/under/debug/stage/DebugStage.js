/**
 * Debug stage
 * - Store stage size
 * - Performs updating and rendering stage
 * - Manages stage element such as entity
 * - Delegates other stage
 * - ### Executes debug process by delegation
 * @extends {DelegateStage}
 * @classdesc Debug stage to execute debug processs by delegation
 */
class DebugStage extends DelegateStage {
    /**
     * Debug stage constructor
     * @param {Stage} stage Original stage for delegation
     * @constructor
     */
    constructor(stage) {
        super(stage);

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
        const players = this.getEntitiesByInterface(IPlayable);
        if (players.length > 0) {
            const player = players[0];
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
        const startX = -this.baseStage.camera.cameraX;
        const startY = -this.baseStage.camera.cameraY;
        const endX = startX + this.baseStage.camera.screenWidth;
        const endY = startY + this.baseStage.camera.screenHeight;
        const mx = Input.mouse.getMouseX() + startX;
        const my = Input.mouse.getMouseY() + startY;
        for (const it of this.getEntities()) {
            if (it.x + it.width >= startX && it.x < endX && it.y + it.height >= startY && it.y < endY) {
                if (it instanceof InfluentialEntity && it.collider !== null) {
                    // render collider
                    it.collider.render(ctx, this.baseStage.camera.baseX - startX, this.baseStage.camera.baseY - startY);
                    // render information
                    if (it.collider.isInCollider(mx, my)) {
                        ctx.fillText(`P(${Math.floor(it.x)}, ${Math.floor(it.y)})`, mx - startX, my - startY, 0.0, 0.0, 20, `white`);
                        if (it instanceof MutableEntity && it.body !== null) {
                            ctx.fillText(`V(${Math.floor(it.body.velocityX)}, ${Math.floor(it.body.velocityY)})`, mx - startX, my - startY + 30, 0.0, 0.0, 20, `white`);
                            ctx.fillText(`M(${Math.floor(it.body.vpx)}, ${Math.floor(it.body.vpy)}),(${Math.floor(it.body.vmx)}, ${Math.floor(it.body.vmy)})`, mx - startX, my - startY + 60, 0.0, 0.0, 20, `white`);
                            ctx.fillText(`A(${Math.floor(it.body.accelerationX)}, ${Math.floor(it.body.accelerationY)})`, mx - startX, my - startY + 90, 0.0, 0.0, 20, `white`);
                            ctx.fillText(`(<${it.body.asGrounds[3]}, ^${it.body.asGrounds[1]}, >${it.body.asGrounds[5]}, ${it.body.asGrounds[7]})`, mx - startX, my - startY + 120, 0.0, 0.0, 20, `white`);
                        }
                    }
                } else if (BaseUtil.implementsOf(it, IColliderable)) {
                    it.getCollider().render(ctx, this.baseStage.camera.baseX - startX, this.baseStage.camera.baseY - startY);
                    if (it.getCollider().isInCollider(mx, my)) {
                        ctx.fillText(`P(${Math.floor(it.x)}, ${Math.floor(it.y)})`, mx - startX, my - startY, 0.0, 0.0, 20, `white`);
                    }
                }
            }
        }
    }

    /**
     * Add entity to stage
     * @override
     * @param {Entity} entity Entity object
     */
    addEntity(entity) {
        entity.setStage(this);
        this.baseStage.addEntity(entity);
    }

    /**
     * Update entity in stage
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateEntity(dt) {
        Timer.it.startTimer(`entity`);
        this.baseStage.updateEntity(dt);
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
        this.baseStage.updatePhysics(dt);
        Timer.it.stopTimer(`physics`);
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
        this.baseStage.renderBackground(ctx, shiftX, shiftY);
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
        this.baseStage.renderEntity(ctx, shiftX, shiftY);
        Timer.it.stopTimer(`renderEntity`);

        // For debug to render entity information
        if (GameDebugger.debug) {
            this.renderEntityInformation(ctx, shiftX, shiftY);
        }
    }
}
