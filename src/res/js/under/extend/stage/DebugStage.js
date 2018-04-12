/**
 * Debug stage
 * - Store stage size
 * - Performs updating and rendering stage
 * - Manages stage element such as entity
 * - Dividingly manages entities according to type
 * - Do not update immutable objects
 * - ### Executes debug process
 * @extends {SplitManagementStage}
 * @classdesc Debug stage to execute debug process
 */
class DebugStage extends SplitManagementStage { // eslint-disable-line  no-unused-vars
    /**
     * Update entity in stage
     * @override
     * @protected
     * @param {number} dt Delta time
     */
    updateEntity(dt) {
        Timer.it.startTimer(`entity`);
        super.updateEntity(dt);
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
        super.updatePhysics(dt);
        Timer.it.stopTimer(`physics`);
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
        super.renderMap(ctx, shiftX, shiftY);
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
        super.renderEntity(ctx, shiftX, shiftY);
        Timer.it.stopTimer(`renderEntity`);

        // For debug to render entity information
        if (Engine.debug) {
            let startX = -this.camera.cameraX;
            let startY = -this.camera.cameraY;
            let mx = Input.mouse.getMouseX() + startX;
            let my = Input.mouse.getMouseY() + startY;
            for (let it of this.entities) {
                if (it.collider !== undefined && it.collider.isInCollider(mx, my)) {
                    ctx.fillText(`(${Math.floor(it.x)}, ${Math.floor(it.y)})`, mx - startX, my - startY, 0.0, 0.0, 20, `white`);
                    if (it.body !== undefined) {
                        ctx.fillText(`(${Math.floor(it.body.velocityX)}, ${Math.floor(it.body.velocityY)})`, mx - startX, my - startY + 30, 0.0, 0.0, 20, `white`);
                        ctx.fillText(`(${Math.floor(it.body.vpx)}, ${Math.floor(it.body.vpy)}),(${Math.floor(it.body.vmx)}, ${Math.floor(it.body.vmy)})`, mx - startX, my - startY + 60, 0.0, 0.0, 20, `white`);
                        ctx.fillText(`(${Math.floor(it.body.accelerationX)}, ${Math.floor(it.body.accelerationY)})`, mx - startX, my - startY + 90, 0.0, 0.0, 20, `white`);
                        ctx.fillText(`((${it.body.isFixX}, ${it.body.isFixY}) - (${Math.floor(it.body.diffX)}, ${Math.floor(it.body.diffY)}))`, mx - startX, my - startY + 120, 0.0, 0.0, 20, `white`);
                    }
                }
            }
        }
    }
}
