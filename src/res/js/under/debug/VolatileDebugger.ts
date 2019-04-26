import { GameDebugger } from "./base/GameDebugger";
import { Context } from "../base/resources/image/Context";

/**
 * - Resets information for each update.
 */
export class VolatileDebugger
    extends GameDebugger
{
    /**
     * Registered debug information.
     */
    protected registeredData: { [s: string]: string; };
    /**
     * Debug information for rendering.
     */
    protected renderingData: Array<string>;

    constructor()
    {
        super();

        this.registeredData = {};
        this.renderingData = [];
    }

    /**
     * @override
     */
    register(name: string, value: string) { this.registeredData[name] = value; }

    /**
     * @override
     */
    init() { }

    /**
     * @override
     */
    update(_dt: number)
    {
        this.renderingData.length = 0;
        for (const name in this.registeredData) {
            this.renderingData.push(this.registeredData[name]);
        }
        // Resets information
        this.registeredData = {};
    }

    /**
     * @override
     */
    render(ctx: Context, x: number, y: number)
    {
        for (const data of this.renderingData) {
            ctx.fillText(`${data}`, x, y, 1.0, 0.0, 20, 'white');
            y += 30;
        }
    }
}
