import { PhysicalWorld } from "../../../base/stage/physics/PhysicalWorld";
import { CollisionResponse } from "../../../base/stage/physics/CollisionResponse";
import { InfluentialEntity } from "../../../base/stage/entity/InfluentialEntity";
import { Collider } from "../../../base/stage/physics/collider/Collider";
import { CollisionData } from "../../../base/stage/physics/collider/CollisionData";
import { Timer } from "../../../base/timer/Timer";
import { Input } from "../../../base/input/Input";
import { UnderRepulsionResponse } from "../../../../game/stage/physics/UnderRepulsionResponse";
import { RepulsionResponse } from "../../../extend/stage/physics/RepulsionResponse";
import { ImpulseBasedResponse } from "../../../extend/stage/physics/ImpulseBasedResponse";
import { SplitWorld } from "../../../extend/stage/physics/SplitWorld";
import { SequentialWorld } from "../../../extend/stage/physics/SequentialWorld";
import { Context } from "../../../base/resources/image/Context";

/**
 * - Measure time for debugging by delegation.
 * - Measure external, body, collide time.
 * @classdesc Measure external, body, collide time by delegation.
 */
export class DebugWorld
    extends PhysicalWorld
{

    /**
     * Counter for judging
     */
    protected judgeCount: number;

    /**
     * @param world Original world for delegation
     * @param stageWidth Stage width (pixel)
     * @param stageHeight Stage height (pixel)
     */
    constructor(protected world: PhysicalWorld, protected stageWidth: number, protected stageHeight: number) {
        super(world.getGravity());

        this.judgeCount = 0;
    }

    /**
     * @override
     */
    setResponse(response: CollisionResponse) { this.world.setResponse(response); }

    /**
     * @override
     */
    getResponse(): CollisionResponse | null { return this.world.getResponse(); }

    /**
     * @override
     */
    addEntity(entity: InfluentialEntity) { this.world.addEntity(entity); }

    /**
     * @override
     */
    removeEntity(entity: InfluentialEntity) { this.world.removeEntity(entity); }

    /**
     * @override
     */
    getCollisionData(collider: Collider): Array<CollisionData> { return this.world.getCollisionData(collider); }

    /**
     * @override
     */
    getCollisionSize(): number { return this.world.getCollisionSize(); }

    /**
     * @override
     */
    updateExternalForce(dt: number)
    {
        Timer.it.startTimer('external');
        this.world.updateExternalForce(dt);
        Timer.it.stopTimer('external');
    }

    /**
     * @override
     */
    prepareBody(dt: number)
    {
        Timer.it.startTimer('body');
        this.world.prepareBody(dt);
    }

    /**
     * @override
     */
    updateBody(dt: number) { this.world.updateBody(dt); }

    /**
     * @override
     */
    updateBodyCleanup(dt: number)
    {
        this.world.updateBodyCleanup(dt);
        Timer.it.stopTimer('body');
    }

    /**
     * @override
     */
    initCollision(dt: number)
    {
        this.judgeCount = 0;
        Timer.it.startTimer('collide');
        this.world.initCollision(dt);
    }

    /**
     * @override
     */
    updateCollision(dt: number) { this.world.updateCollision(dt); }

    /**
     * @override
     */
    updateResponse(dt: number) { this.world.updateResponse(dt); }

    /**
     * @override
     */
    judgeContinueCollision(dt: number): boolean
    {
        this.judgeCount += 1;
        return this.world.judgeContinueCollision(dt);
    }

    /**
     * @override
     */
    cleanup(dt: number)
    {
        Timer.it.stopTimer('collide');
        this.world.cleanup(dt);
    }

    /**
     * @override
     */
    update(dt: number)
    {
        super.update(dt);
        // Change response (Q)
        if (Input.key.isPress(Input.key.a() + 16)) {
            const response = this.world.getResponse();
            if (response instanceof UnderRepulsionResponse) {
                this.world.setResponse(new RepulsionResponse());
            } else if (response instanceof RepulsionResponse) {
                this.world.setResponse(new ImpulseBasedResponse());
            } else {
                // TODO: Separate from debug
                this.world.setResponse(new UnderRepulsionResponse());
            }
        }
        // Change wprld (W)
        if (Input.key.isPress(Input.key.a() + 22)) {
            const world = this.world instanceof SplitWorld ? new SequentialWorld(this.gravity / 10000) : new SplitWorld(this.stageWidth, this.stageHeight, this.gravity / 10000);
            const response = this.world.getResponse();
            if(response !== null) {
                world.setResponse(response);
            }
            // TODO: Get list of entity
            /*
            for (const it of this.world.entities) {
                world.addEntity(it);
            }
            */
            this.world = world;
        }
    }

    /**
     * @override
     */
    render(ctx: Context, shiftX: number, shiftY: number) { this.world.render(ctx, shiftX, shiftY); };
}
