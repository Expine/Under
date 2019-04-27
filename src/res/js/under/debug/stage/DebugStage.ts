import { DelegateStage } from "../../extend/stage/DelegateStage";
import { isIPlayable } from "../../base/stage/entity/interface/IPlayable";
import { GameDebugger } from "../base/GameDebugger";
import { DebugWorld } from "./physics/DebugWorld";
import { InfluentialEntity } from "../../base/stage/entity/InfluentialEntity";
import { BaseUtil } from "../../base/util/BaseUtil";
import { MutableEntity } from "../../base/stage/entity/MutableEntity";
import { Input } from "../../base/input/Input";
import { Context } from "../../base/resources/image/Context";
import { isIColliderable } from "../../base/stage/entity/interface/IColliderable";
import { Entity } from "../../base/stage/entity/Entity";
import { Timer } from "../../base/timer/Timer";

/**
 * - Executes debug process by delegation.
 */
export class DebugStage
    extends DelegateStage
{
    /**
     * Sequential execution mode.
     */
    protected debugMode: boolean = false;

    /**
     * Register debug information.
     */
    protected registerInformation(dt: number)
    {
        const players = this.getEntitiesByInterface(isIPlayable);
        if (players.length > 0) {
            const player = players[0];
            const physic = this.getPhysicalWorld();
            const response = physic === null ? null : physic.getResponse();
            GameDebugger.it.register('time', `${dt} mssc`);
            if(physic != null) {
                GameDebugger.it.register('collision', `${physic.getCollisionSize()} collision`);
            }
            if (player instanceof InfluentialEntity && player.collider != null) {
                GameDebugger.it.register('pcollision', `${player.collider.collisions.length} player collision`);
            }
            if(physic !== null && response !== null) {
                // TODO: Get debug delegation world
                GameDebugger.it.register('physics', `${BaseUtil.getClassName(physic instanceof DebugWorld ? physic/* .world */ : physic)}-${BaseUtil.getClassName(response)}`);
            }
            GameDebugger.it.register('ppos', `Pos(${Math.floor(player.x)}, ${Math.floor(player.y)})`);
            if (player instanceof MutableEntity && player.body !== null) {
                GameDebugger.it.register('pvec', `Vec(${Math.floor(player.body.velocityX)}, ${Math.floor(player.body.velocityY)})`);
                GameDebugger.it.register('pacc', `Acc(${Math.floor(player.body.accelerationX)},${Math.floor(player.body.accelerationY)})`);
            }
            // TODO: Get state
            /*
            if (player instanceof StateCharacter && player.state !== null) {
                GameDebugger.it.register('state', `${BaseUtil.getClassName(player.state)}`);
            }
            */
            GameDebugger.it.register('mouse', `M(${Math.floor(Input.mouse.getMouseX())},${Math.floor(Input.mouse.getMouseY())})`);
        }
    }

    /**
     * Render entity information for debug.
     * @param ctx Canvas context.
     * @param shiftX Shift x position.
     * @param shiftY Shift y position.
     */
    protected renderEntityInformation(ctx: Context, _shiftX: number, _shiftY: number)
    {
        const camera = this.baseStage.getCamera();
        if(camera === null) {
            return;
        }
        const startX = -camera.cameraX;
        const startY = -camera.cameraY;
        const endX = startX + camera.screenWidth;
        const endY = startY + camera.screenHeight;
        const mx = Input.mouse.getMouseX() + startX;
        const my = Input.mouse.getMouseY() + startY;
        for (const it of this.getEntities()) {
            if (it.x + it.width >= startX && it.x < endX && it.y + it.height >= startY && it.y < endY) {
                if (it instanceof InfluentialEntity && it.collider !== null) {
                    // render collider
                    it.collider.render(ctx, camera.baseX - startX, camera.baseY - startY);
                    // render information
                    if (it.collider.isInCollider(mx, my)) {
                        ctx.fillText(`P(${Math.floor(it.x)}, ${Math.floor(it.y)})`, mx - startX, my - startY, 0.0, 0.0, 20, 'white');
                        if (it instanceof MutableEntity && it.body !== null) {
                            ctx.fillText(`V(${Math.floor(it.body.velocityX)}, ${Math.floor(it.body.velocityY)})`, mx - startX, my - startY + 30, 0.0, 0.0, 20, 'white');
                            // TODO: Get information
                            // ctx.fillText(`M(${Math.floor(it.body.vpx)}, ${Math.floor(it.body.vpy)}),(${Math.floor(it.body.vmx)}, ${Math.floor(it.body.vmy)})`, mx - startX, my - startY + 60, 0.0, 0.0, 20, 'white');
                            ctx.fillText(`A(${Math.floor(it.body.accelerationX)}, ${Math.floor(it.body.accelerationY)})`, mx - startX, my - startY + 90, 0.0, 0.0, 20, 'white');
                            ctx.fillText(`(<${it.body.asGrounds[3]}, ^${it.body.asGrounds[1]}, >${it.body.asGrounds[5]}, ${it.body.asGrounds[7]})`, mx - startX, my - startY + 120, 0.0, 0.0, 20, 'white');
                        }
                    }
                } else if (isIColliderable(it)) {
                    const collider = it.getCollider();
                    if(collider !== null) {
                        collider.render(ctx, camera.baseX - startX, camera.baseY - startY);
                        if (collider.isInCollider(mx, my)) {
                            ctx.fillText(`P(${Math.floor(it.x)}, ${Math.floor(it.y)})`, mx - startX, my - startY, 0.0, 0.0, 20, 'white');
                        }
                    }
                }
            }
        }
    }

    /**
     * @override
     */
    addEntity(entity: Entity)
    {
        entity.setStage(this);
        this.baseStage.addEntity(entity);
    }

    /**
     * @override
     */
    updateEntity(dt: number)
    {
        Timer.it.startTimer('entity');
        this.baseStage.updateEntity(dt);
        Timer.it.stopTimer('entity');
    }

    /**
     * @override
     */
    updatePhysics(dt: number)
    {
        Timer.it.startTimer('physics');
        this.baseStage.updatePhysics(dt);
        Timer.it.stopTimer('physics');
    }

    /**
     * @override
     */
    update(dt: number)
    {
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
     * @override
     */
    renderBackground(ctx: Context, shiftX: number, shiftY: number)
    {
        Timer.it.startTimer('renderBackground');
        this.baseStage.renderBackground(ctx, shiftX, shiftY);
        Timer.it.stopTimer('renderBackground');
    }

    /**
     * @override
     */
    renderEntity(ctx: Context, shiftX: number, shiftY: number)
    {
        Timer.it.startTimer('renderEntity');
        this.baseStage.renderEntity(ctx, shiftX, shiftY);
        Timer.it.stopTimer('renderEntity');

        // For debug to render entity information
        if (GameDebugger.debug) {
            this.renderEntityInformation(ctx, shiftX, shiftY);
        }
    }
}
