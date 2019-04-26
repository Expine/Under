import { Layer } from "../../../base/scene/layer/Layer";
import { GameDebugger } from "../../base/GameDebugger";
import { Context } from "../../../base/resources/image/Context";
import { Timer } from "../../../base/timer/Timer";

/**
 * - Renders information necessary for debugging
 */
export class DebugLayer
    extends Layer
{
    /**
     * @param debug Debugger instance.
     */
    constructor(protected debug: GameDebugger)
    {
        super();
    }

    /**
     * @override
     */
    init() { this.debug.init(); }

    /**
     * @override
     */
    update(dt: number) { this.debug.update(dt); }

    /**
     * @override
     */
    render(ctx: Context)
    {
        Timer.it.render(ctx, this.x, this.y);
        this.debug.render(ctx, this.x + this.width, this.y);
    }
}
